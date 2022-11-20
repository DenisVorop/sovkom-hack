from pydantic import BaseModel
from typing import Union, List, Optional
from functools import wraps
from sanic.response import text, json as json, redirect
from utils.hash import new_hash

class NewAccount(BaseModel):
    account_hash: Union[str, None]
    ticket: Union[str, None]
    type: Union[str, None]
    leverage: Union[float, None]

class FirstAccount(BaseModel):
    id_user: Union[str, None]



class DelAccount(BaseModel):
    id_account: int

class DelAccounts(BaseModel):
    txs: List[int]

class EditAccount(NewAccount, DelAccount): 
    pass

class ApproveInvoice(BaseModel):
    id_account: Union[int, None] 
    amount: Union[float, None] = 0

from models.sqls.new_account import (
                    to_sqlobj,
                    sql_insert_account,
                    sql_select_account_by_userid,
                    sql_delete_account,
                    sql_select_account_by_accountid
                    )

async def cached_user_accounts_list(db, id_user, disable_cache=False):
    accounts=await db.lazy_cache(
            f"list_accounts{id_user}",
            cache=0 if disable_cache else 10,
            func=lambda: db.async_pg_pool_work_sqls([ # async lambda
                    to_sqlobj(sql_select_account_by_userid, 
                                    {"id_user":id_user })
                    ])
                )
    return accounts

async def cached_account_by_id(db, id_account):
    accounts=await db.lazy_cache(
            f"account_by_accountid_{id_account}",
            cache=10,
            func=lambda: db.async_pg_pool_work_sqls([ # async lambda
                    to_sqlobj(sql_select_account_by_accountid, 
                                    {"id":id_account })
                    ])
                )
    return accounts

async def create_account(db, new_account_obj, id_user) :
    hash= new_hash(150) ; new_account_obj['account_hash'] = hash
    # TODO: not optimized
    res = await db.async_pg_pool_work_sqls([ 
            to_sqlobj(sql_insert_account, {"new_account": new_account_obj, 
                                            "id_user":        id_user
                                            }, 
                                            sql_fields='new_account')
            ])
    if res and 'id_account' in res[0][0]: return hash

async def create_first_account(db, id_user):
    return await create_account(db, 
                                dict(NewAccount(ticket="RUB", leverage=1, type="main")), 
                                id_user, )

async def init_first_accont(db, id_user):
    hash = await create_first_account(db, id_user)
    if hash: 
        upated_list=await cached_user_accounts_list(db, id_user, disable_cache=True)
        return upated_list
    return []

def user_accounts():
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs): #print(args, kwargs)
            request=args[0]
            token=request.token
            user=request.ctx.user
            db = request.app.config['db']
            user_accounts=await cached_user_accounts_list(db, user['id'])
            print(user_accounts)
            if not user_accounts[0]: # check
                user_accounts=await init_first_accont(db, user['id'])
            request.ctx.user_accounts=user_accounts
            return await func(*args, **kwargs)
        return wrapper
    return decorator

def user_account_check_found():
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs): #print(args, kwargs)
            request=args[0]
            token=request.token
            user=request.ctx.user
            accounts=request.ctx.user_accounts[0]
            body=kwargs['payload']
            id_account=body['id_account']
            db = request.app.config['db']
            found=db.found_in_list(accounts, "id_account", id_account)
            if not found: return text("403",  status=403)
            request.ctx.user_account_check_found=found
            return await func(*args, **kwargs)
        return wrapper
    return decorator

def account_by_accountid():
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs): #print(args, kwargs)
            request=args[0]
            # token=request.token
            # user=request.ctx.user
            body=kwargs['payload']
            db = request.app.config['db']
            request.ctx.account=await cached_account_by_id(db, body['id_account'])
            return await func(*args, **kwargs)
        return wrapper
    return decorator


# user_fields=[    ]

# def filter_by_list(d: dict, filter: list):
#     new_dict={}
#     for n in d:
#         if n in filter: new_dict[n] = d[n]
#     return new_dict

# def filter_user_edit_tx_dict(d: dict): return filter_by_list(d, user_fields)

