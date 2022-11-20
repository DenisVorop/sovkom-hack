from sanic.response import text, json as json, redirect
from sanic_pydantic import webargs
import time

from context.auth import if_user

#from sanic_restful_api import reqparse, abort, Api, Resource

#from utils.guest_ticket import Ticket; ticket=Ticket("txs")
# from utils.guest_ticket import init_ip_pause_block
# ip_pause_block = init_ip_pause_block(id="ip_checks", 
#                                      func_return=json, 
#                                      time_block=5)

from models.new_tx import (
                    NewTx,
                    DelTx,
                    create_new_tx,
                    user_txs,
                    account_txs
                    )

from models.new_account import (
                    user_accounts,
                    user_account_check_found,
                    )
from utils.api import (
                    remove_non_fields,
                    filter_post_fields,
                    sql_cache_schema,
                    sql_cache_schema_to_list,
                    lazy_cache,
                    lazy_cache_by_token
                    )
from models.sqls.new_tx import (
                    to_sqlobj,
                    sql_insert_tx,
                    #sql_select_account_by_userid,
                    #sql_delete_account
                    )

test = "test"*5000

from utils.hash import new_hash

# from models.test_insert import ( new_obj, batch_obj, to_sql_native, to_sql_native_block, to_multi_values )

def status_is_ok(res, id='id'):
    try: return res[0][0][id]
    except: return





class InitRoutes:
    def __init__(self, app=None, interfaces=None): 



        @app.route("/api/transaction/new", methods=["POST"])
        @webargs(body=NewTx)
        @if_user(cache_auth=30)
        @user_accounts()
        @user_account_check_found()
        async def new_tx(request,  **kwargs):
            print(request.ctx.user)
            id_account=kwargs['payload']['id_account']
            del(kwargs['payload']['id_account'])
            # TODO: not optimized
            hash = (await create_new_tx(request.app.config['db'], id_account, kwargs['payload']))
            print(hash)
            if hash: return json({'hash':hash})
            return json({'error':1})


        @app.route("/api/transactions/list", methods=["POST"])
        @webargs(body=DelTx)
        @if_user(cache_auth=30)
        @user_accounts()
        @user_account_check_found()
        @user_txs()
        @account_txs()
        async def txs(request,  **kwargs):
            return json({'content':request.ctx.account_txs})

        @app.route("/api/transactions/all", methods=["GET"])
        @webargs()
        @if_user(cache_auth=30)
        #@user_accounts()
        #@user_account_check_found()
        @user_txs()
        async def txs_all(request,  **kwargs):
            return json({'content':request.ctx.user_txs})