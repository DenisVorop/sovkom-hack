import os, sys, time, datetime; os.environ['TZ'] = os.environ.get("TZ",'Europe/Moscow'); SAVE_DIR = os.environ.get('FILE_DUMP_DIR','dumps/'); 
SERVICE_NAME = os.environ.get('SERVICE_NAME','undefined')+':: db/cached'; sys.path.append('./') ; sys.path.append('../') ; sys.path.append('../../') #load libs

from utils.log_timer import LogTimer;t = LogTimer(); log_time = t.log_time ; spent_time = t.spent_time; rps_count = t.rps_count

import json, ujson, pickle
#import asyncio

from datetime import datetime, timedelta
from pytz import timezone

hours = {};minutes = {}
hours['24'] = 86400
hours['1'] = hours['24'] / 24
minutes['15'] = hours['1'] / 4


cached = {};cached_json = {}
cached_levels = {};cached_levels_json = {}

PRINT_EVENTS= int(os.environ.get('DB_PRINT_EVENTS', 0))
ONLY_REDIS = int(os.environ.get('DB_ONLY_REDIS', 0))


#PRINT_EVENTS=True
#key=lambda x: get_async(await somefunction(x) for _ in '_')


def static_to_json(id):
    if cached[id]['content']:
        cached_json[id]['content'] = cached[id]['content']
        if isinstance(cached[id]['content'],str): #type(cached[id]['content'])==str: 
            if PRINT_EVENTS: log_time('parse_json_'+id)
            if PRINT_EVENTS: print('parse json(',id,')',len(list(cached_json[id]['content'])),datetime.today())
            try: cached_json[id]['content'] = json.loads(cached_json[id]['content'])
            except Exception as e: 
                print(e)
                cached_json[id]['content']=None
            if PRINT_EVENTS: print('parse_json_done',id,log_time('parse_json_'+id),len(list(cached_json[id]['content'])),datetime.today())
            return None if not cached_json[id]['content'] else cached_json[id]['content'].copy()
        else: return cached_json[id]['content'].copy()

#from db.db_connector import PostgresMongoRedisFileConnectionAgent as X;
#from db.asyncf.db_postgres import AsyncPostgressDb as Y;
#from db.asyncf.save_file import AsyncFiles as Z;


def from_byte(r):
    if type(r)==bytes: return bytes(r).decode('utf-8')
    return r
def def_json_dumps(data):
        return ujson.dumps(data, ensure_ascii=False, default=str)
def from_any_to_json_str(x):
    # if PRINT_EVENTS: print("from_any_to_json_str", len(x), x[0],type(x),str, isinstance(x, str), type(x)==str)
    if type(x)==bytes: x=from_byte(x)
    if not isinstance(x, str) or type(x)!=str: 
        if PRINT_EVENTS: print('to json')
        x=def_json_dumps(x)
    # if PRINT_EVENTS: print("from_any_to_json_str done", len(x), x[0],type(x), type(x)==str)
    return x


class Cached():
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
    def cached_clear_cache(self):
        self.flush_redis()
        cached.clear()
        cached_json.clear()
    @staticmethod
    def get_async(async_iterator): return async_iterator.__anext__()
    def async_wrapper(self, method): self.get_async(await method for _ in '_')
    @staticmethod
    async def async_get_cached(id, method, cache_interval = 10, need_json=False, force_update_flag_function = None):
        id = id +'_json'+ str(need_json) # fix
        if PRINT_EVENTS: print('get_cached(',id,') interval ',cache_interval)
        # TODO: можно внедрить интервал, либо задержку
        # hardcache
        FORCE_UPD_FLAG = None
        if force_update_flag_function: FORCE_UPD_FLAG = force_update_flag_function()
        if PRINT_EVENTS: print(FORCE_UPD_FLAG,"FORCE_UPD_FLAG")
        if not FORCE_UPD_FLAG: # если нет условия обновления, то по времени обновлять
            if need_json and id in cached_json and time.time() - cached_json[id]['time'] < cache_interval: # get json
                #print(cached_json[id]['content'])
                if 'content' in cached_json[id]: # important
                    if PRINT_EVENTS: print('get cached(',id,') json',len(list(cached_json[id]['content'])),datetime.today())
                    if isinstance(cached_json[id]['content'],str):
                        #####
                        return static_to_json(id) 
                        #####
                    return cached_json[id]['content'].copy() # json # NO COPY is critical error
                
            if id in cached and time.time() - cached[id]['time'] < cache_interval: # get cached text
                if 'content' in cached[id]: # important
                    if PRINT_EVENTS: print('get cached(',id,') ', len(cached[id]['content']),datetime.today())
                    if need_json:
                        #####
                        return static_to_json(id)
                        
                        #####
                    return cached[id]['content']
        if not id in cached: cached[id] = {}
        cached[id]['time'] = time.time()
        if PRINT_EVENTS: print('get method(',id,')',datetime.today())
        if PRINT_EVENTS: log_time('get_method_'+id)
        #asyncio.iscoroutinefunction(
        cached[id]['content'] = from_any_to_json_str(await method()) # not json


        if not isinstance(cached[id]['content'], str): cached[id]['content']=def_json_dumps(cached[id]['content'])
        if not type(cached[id]['content'])==bytes: cached[id]['content']=from_byte(cached[id]['content'])
        if cached[id]['content']=='None': cached[id]['content']=None
        if PRINT_EVENTS: print('get_method_done',id,log_time('get_method_'+id),len(cached[id]['content']),datetime.today())
        #print(cached[id]['content'])
        if need_json: 
            #print('get json()')
            if not id in cached_json: cached_json[id] = {}
            cached_json[id]['time'] = time.time()
            if cached[id]['content']: 
                if PRINT_EVENTS: print('get json(',id,')',len(cached[id]['content']),datetime.today())
                #####
                return static_to_json(id)
                #####
                #return None if not cached_json[id]['content'] else cached_json[id]['content'].copy() # json # NO COPY is critical error
            if PRINT_EVENTS: print('error_content_empty(',id,')',str(cached_json[id]['content']))
            del(cached_json[id])
            return None
        return cached[id]['content'] # text content


    # @staticmethod
    # def from_byte(r):
    #     if type(r)==bytes: return bytes(r).decode('utf-8')
    #     return r
    # @staticmethod
    # def def_json_dumps(data):
    #     return ujson.dumps(data, ensure_ascii=False, default=str)

    async def async_redis_or_method(self, id, method, redis_interval=hours['24'], conv='json', force_update_flag_function = None):
        if force_update_flag_function and force_update_flag_function(): pass
        else:
            r = self.read_redis(id, conv)
            if r: 
                if conv=='native' and type(r)==bytes: return bytes(r).decode('utf-8')
                return r
        d = from_any_to_json_str(await method()) # взять данные откуда - то
        if not isinstance(d, str): d=def_json_dumps(d)
        if d: self.save_redis(id, d, timeout=redis_interval , conv=conv)
        return d
    async def async_read_get_cached_or_redis(self, id, 
                                        method, 
                                        cache_interval=10, 
                                        redis_interval=hours['24'], 
                                        conv='json', 
                                        return_json=False, 
                                        force_update_flag_function=None,
                                        only_redis=None,
                                        only_cached=None,
                                        id_levels=None):
        
        #if only_redis or ONLY_REDIS: return await self.async_redis_or_method(id, method, redis_interval, conv, force_update_flag_function=force_update_flag_function)
        if only_cached: METHOD = method #lambda x: get_async(await method(x) for _ in '_') #method
        else: METHOD = lambda: self.async_redis_or_method(id, method, redis_interval, conv, force_update_flag_function=force_update_flag_function)
        
        
        # if id_levels and len(id_levels)>1 and len(id_levels[1])>1: 
        #     return self.get_cached_levels(id_levels, 
        #                 METHOD, #lambda: self.redis_or_method(id, method, redis_interval, conv, force_update_flag_function=force_update_flag_function),
        #                 cache_interval=cache_interval,
        #                 need_json=return_json,
        #                 force_update_flag_function = force_update_flag_function)
        return await self.async_get_cached(id, 
                            METHOD, #lambda: self.redis_or_method(id, method, redis_interval, conv, force_update_flag_function=force_update_flag_function),
                            cache_interval=cache_interval,
                            need_json=return_json,
                            force_update_flag_function = force_update_flag_function)