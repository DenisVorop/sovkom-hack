import asyncpg, os
#from settings import PostgreSqlConfig
# https://github.com/FerdinaKusumah/sanic-asyncpg

DATABASE_URL = "postgres://{user}:{password}@{host}:{port}/{database}".format( # "mysql+asyncmy://root:mysqlpass@localhost:3306/test"
    user=os.environ.get('POSTGRES_USER','postgres'), 
    password=os.environ.get('POSTGRES_PASSWORD','password'), 
    host=os.environ.get('psql_host', '0.0.0.0'),
    port=os.environ.get('psql_port', 5432), 
    database=os.environ.get('POSTGRES_DB', 'some_database'),
)

from datetime import datetime, timedelta
from pytz import timezone

import asyncio, time

PRINT_EVENTS= int(os.environ.get('DB_PRINT_EVENTS', 0))

def posgre_data_with_field_names(data,fieldnames, serialize=True):
    data_object=[]
    for row in data:
        obj={}
        for index,name in enumerate(fieldnames):
            d = row[index]
            if serialize:
                if isinstance(d,datetime): d = str(d) 
            obj[name]=d
        data_object.append(obj)
    return data_object


bank={}
last_time={}
res_bank={}
pools={}
last_id=None

class AsyncPostgressDb:
    @staticmethod
    def gen_select_tables(tables):
        sqls=[]
        for table in tables:
            sqls.append([f"select * from {table};"])
        return sqls
    async def async_bench_select_postgre(self, tables):
        sqls=self.gen_select_tables(tables)
        res=await self.async_bench_fetch_postgre(sqls)
        out={}
        for i,table in enumerate(tables):
            out[table]=res[i]
        bank.update(out)
        return out
    @staticmethod
    def postgre_read_history(id=None):
        if not id: return bank
        return bank[id]

    # def __init__(self):
    #     pass
    async def async_pg_connect(self):
        conn = await asyncpg.connect(DATABASE_URL)
        return conn

    # for sanic
    #@staticmethod
    async def async_pg_create_pool(self, app, loop, id="global"):
        print(DATABASE_URL)
        if not 'pools' in app.config: app.config['pools'] = {}
        app.config['pools'][id] = await  asyncpg.create_pool(
            dsn=DATABASE_URL,
            min_size=10, #in bytes,
            max_size=10, #in bytes,
            max_queries=50000,
            max_inactive_connection_lifetime=300,
            loop=loop)
        app.config['pool']=app.config['pools'][id]
        global last_pool, last_id, pools
        last_pool=pools[(last_id:=id)]=app.config['pool']
        app.config['db'] = self
        return last_pool

    @staticmethod
    async def async_pg_pool_work(func, pool=None):
        if not pool: pool=last_pool
        async with pool.acquire() as conn:
            await func(conn)

    async def async_pg_pool_work_sqls(self, sqls_list, pool=None, flag_multi_values=False):
        if not pool: pool=last_pool
        async with pool.acquire() as conn:
            return await self.async_pg_fetch_many(conn, sqls_list, flag_multi_values)

    @staticmethod
    async def async_pg_close_pools(app, loop):
        for n in pools:
            async with pools[n].acquire() as conn:
                await conn.close()

    # async def async_pg_pool(self):
    #     conn = await asyncpg.connect(DATABASE_URL)
    #     return conn

    async def async_pg_close(self,conn):
        await conn.close()


    async def async_pg_fetch(self, curr, sql, values=None, flag_multi_values=False):
        if values: 
            if flag_multi_values: a = await curr.executemany(sql, values) # "insert ... $1", [("aa","bb"), ("aa","bb)]
            else: a = await curr.fetch(sql,*values) # "select .. $1" , ["aa", "bb"]
        else: a = await curr.fetch(sql)
        #print(a)
        #if not filt:
        if a:
            return [dict(el) for el in a]#posgre_data_with_field_names(a, #curr.fetchall(),   
        return a                                    

    async def async_pg_fetch_many_tables(self, tables, curr=None):
        out={}
        sqls=self.gen_select_tables(tables)
        res=await self.async_pg_fetch_sqls(sqls, curr)
        for i,table in enumerate(tables):
            out[table]=res[i]
        bank.update(out)
        return out


    async def async_pg_fetch_many(self, curr, sqls, flag_multi_values=False):
        result=[]
        if isinstance(sqls, str): return [ await curr.execute(sqls) ]
        # for sql in sqls:
        #     # print(sql)
        #     if isinstance(sql, str): res = await self.async_pg_fetch(curr=curr, sql=sql)
        #     elif len(sql)>1: res = await self.async_pg_fetch(curr=curr, sql=sql[0], values=sql[1], flag_multi_values=flag_multi_values)
        #     else: res = await self.async_pg_fetch(curr=curr, sql=sql[0])
        #     result.append(res)
        awaits_results=[]
        for sql in sqls:
            # print(sql)
            if isinstance(sql, str): awaits_results.append(self.async_pg_fetch(curr=curr, sql=sql))
            elif len(sql)>1: awaits_results.append(self.async_pg_fetch(curr=curr, sql=sql[0], values=sql[1], flag_multi_values=flag_multi_values))
            else: awaits_results.append(self.async_pg_fetch(curr=curr, sql=sql[0]))
        for done in awaits_results:
            result.append(await done)
        return result

# https://stackoverflow.com/questions/43739123/best-way-to-insert-multiple-rows-with-asyncpg
    async def pool_fetch_one_sql(self, sql, values_list, pool=None):
        if not pool: pool=last_pool
        async with pool.acquire() as conn:
            return await self.async_pg_multi_fetch_one_sql(conn, sql, values_list)
    async def async_pg_multi_fetch_one_sql(self, curr, sql, values):
        return await curr.executemany(sql, values)

    async def async_pg_fetch_sqls(self, sqls, conn=None, flag_multi_values=False):
        if not conn: 
            curr= await self.async_pg_connect()
            res = await self.async_pg_fetch_many(curr, sqls, flag_multi_values=flag_multi_values)
            await self.async_pg_close(curr)
        else: res = await self.async_pg_fetch_many(conn, sqls, flag_multi_values=flag_multi_values)
        return res

    async def async_pg_fetch_sql(self, sql, curr=None):
        return await self.async_pg_fetch_sqls([[sql]])

    async def async_select_postgre(self, table, fieldnames='*', filter = '', values=None, conn=None):
        if filter: filter =' ' + filter; #if not fieldnames: fieldnames = '*'
        #if PRINT_EVENTS: print('sel_postgre '+table)

        sql = '''SELECT '''+fieldnames+' from '+table + filter +';' #print(sql)
        if PRINT_EVENTS: print(sql)
        if not conn: 
            curr= await self.async_pg_connect()
            res=await self.async_pg_fetch(curr, sql, values)
            await self.async_pg_close(curr)
        else:
            res=await self.async_pg_fetch(conn, sql, values)
        return res

    async def async_trys(self, n=2, func=None):
        count=0; res=None
        while(  not res or count<n ):
            count+=1
            try: 
                res=await func()
                #print(res)
                break
            except: pass
        return res

    # fastest 1 conn
    async def async_pg_fetch_many_tables_by_trys(self, n=2, tables=None, conn=None):
        return await self.async_trys(n, lambda: self.async_pg_fetch_many_tables(tables, conn))

    async def history_or_select_tables_by_cachetrys(self, cache=2, id=None, tables=None, trys=None, conn=None):
        id = id or tables #; flag_cache=False
        if not tables: tables=id
        flag_cache = tables!=id and tables in last_time and time.time()-last_time[tables]<cache or\
                                      id in last_time and time.time()-last_time[id]<cache
        if flag_cache: # cache
            if PRINT_EVENTS: print('cache',id)
            if id in bank: return bank[id]
            if id in res_bank:
                if id != tables: 
                    if id in res_bank[tables]: return res_bank[tables]
                    return res_bank[tables]
                else: return res_bank[id]
                #if id in res_bank[tables]: return res_bank[tables][id]
        if PRINT_EVENTS: print('read')
        res=await self.async_pg_fetch_many_tables_by_trys(trys, tables.split(','), conn) # no cache
        if res: 
            res_bank[tables] = res # save cache
            last_time[id]=time.time()
            last_time[tables]=time.time()
            if id in res: return res[id]
            return res
        
