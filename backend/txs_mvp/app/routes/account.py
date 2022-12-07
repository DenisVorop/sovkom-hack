from sanic.response import text, json as json, redirect
from sanic_pydantic import webargs
import time

from context.auth import if_user


# для инвойса
from models.new_tx import (
                    create_new_tx,
                    )

from models.new_account import (
                    #EditAccount, 
                    NewAccount, 
                    FirstAccount,
                    DelAccount,
                    ApproveInvoice,
                    #map_filter_insert_fields_to_db_fields,
                    #filter_user_edit_tx_dict
                    create_account,
                    create_first_account,
                    cached_user_accounts_list,
                    user_accounts,
                    user_account_check_found,
                    account_by_accountid,
                    )
from utils.api import (
                    remove_non_fields,
                    filter_post_fields,
                    sql_cache_schema,
                    sql_cache_schema_to_list,
                    lazy_cache,
                    lazy_cache_by_token
                    )
from models.sqls.new_account import (
                    to_sqlobj,
                    sql_insert_account,
                    sql_select_account_by_userid,
                    sql_delete_account,
                    )

test = "test"*5000

from utils.hash import new_hash

# from models.test_insert import ( new_obj, batch_obj, to_sql_native, to_sql_native_block, to_multi_values )

def status_is_ok(res, id='id'):
    try: return res[0][0][id]
    except: return





class InitRoutes:
    def __init__(self, app=None, interfaces=None): 


        # @app.route("/api/sql_schema/<table_name>", methods=["GET"])
        # async def sql_schema(request, table_name):

        #     res = sql_cache_schema_to_list((await interfaces.db().async_pg_pool_work_sqls([ 
        #             to_sqlobj(sql_cache_schema, {'table':table_name}) 
        #             ]))[0])
            # return text(res)

        @app.route("/api/account/new", methods=["POST"])
        #@ip_pause_block()
        @webargs(body=NewAccount)
        #@filter_post_fields(map_filter_insert_fields_to_db_fields)
        @if_user(cache_auth=30)
        async def new_account(request,  **kwargs):
            print(request.ctx.user)
            hash = await create_account(request.app.config['db'], 
                                        kwargs['payload'], 
                                        request.ctx.user['id'] )
            if hash: return json({'account_hash':hash})
            return json({'error':1})

        # создание первого аккаунта
        @app.route("/api/service/account/first", methods=["POST"])
        #@ip_pause_block()
        @webargs(body=FirstAccount)
        #@filter_post_fields(map_filter_insert_fields_to_db_fields)
        @if_user(cache_auth=30)
        @user_accounts()
        async def first_account(request,  **kwargs):
            hash = await create_first_account(request.app.config['db'], kwargs['payload']['id_user'], )
            if hash: return json({'account_hash':hash})
            return json({'error':1})


        @app.route("/api/account/list", methods=["GET"])
        #@ip_pause_block()
        #@webargs(body=NewAccount)
        #@filter_post_fields(map_filter_insert_fields_to_db_fields)
        #@lazy_cache_by_token(cache=5, id_by_token="_list_accounts")
        @if_user(cache_auth=30) 
        @user_accounts()
        async def list_accounts(request,  **kwargs): 
            # TODO: not optimized
            users_accounts=request.ctx.user_accounts[0]
            id_user=request.ctx.user["id"] 
            db=request.app.config['db']
            if users_accounts: 
                return json({'content':users_accounts}, default=str)
            return json({"error":1,"desc":"not found"}, status=404)

        @app.route("/api/account/del", methods=["POST"])
        #@ip_pause_block()
        @webargs(body=DelAccount)
        #@filter_post_fields(map_filter_insert_fields_to_db_fields)
        @if_user(cache_auth=30)
        @user_accounts()
        @user_account_check_found()
        async def del_account(request,  **kwargs): 
            id_user=request.ctx.user['id']
            id_account=kwargs['payload']['id_account']
            accounts=request.ctx.user_accounts[0]
            if request.ctx.user_account_check_found:
                # TODO: not optimized
                res = await interfaces.db().async_pg_pool_work_sqls([ 
                        to_sqlobj(sql_delete_account, 
                            {"id": id_account})
                    ])
                return json({'success':1}, default=str)
            return json({"error":1,"desc":'not found'}, status=403)

        @app.route("/api/account/invoice", methods=["POST"])
        @if_user(cache_auth=30) 
        @user_accounts()
        async def invoice(request,  **kwargs): 
            return json({ 
                    #"test": request.ctx.user_accounts[0],
                    "url_invoice": "https://redirect?callback=",
                    "url_callback": "https://txs_mvp:3300/api/account/approve_invoice?status=success&hash=?status=ok&hash=",
                    "hash": new_hash()
                }, default=str)

        @app.route("/api/account/approve_invoice", methods=["POST"])
        #@if_user(cache_auth=30) # без авторизации
        @webargs(body=ApproveInvoice)
        @account_by_accountid()
        async def approve_invoice(request,  **kwargs): 
            amount=kwargs['payload']['amount']
            
            hash = (await create_new_tx(request.app.config['db'], id_account, kwargs['payload']))
            return json({'success':1, 'amount':amount, 'account': request.ctx.account}, default=str)
      