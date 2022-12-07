from pydantic import BaseModel
from typing import Union, List, Optional
from functools import wraps
from sanic.response import text, json as json, redirect
from utils.hash import new_hash

from models.sqls.new_tx import (
                    to_sqlobj,
                    sql_select_txs_by_userid,
                    sql_insert_tx
                    )

class NewTx(BaseModel):
    id_account: int
    tx_hash: Union[str, None]
    ticket_from: Union[str, None]
    ticket_to: Union[str, None]
    instrument: Union[str, None]
    amount: Union[float, None]
    leverage: Union[float, None]
    client_open_value: Union[float, None]
    backand_open_value: Union[float, None]
    client_close_value: Union[float, None]
    backand_close_value: Union[float, None]
    status: Union[str, None]

class DelTx(BaseModel):
    id_account: int

class DelTxs(BaseModel):
    txs: List[int]

class EditTx(NewTx, DelTx): 
    pass


async def create_new_tx(db, id_account, new_tx_obj):
    hash= new_hash(150) ; new_tx_obj['tx_hash'] = hash
    # TODO: not optimized
    res = await db.async_pg_pool_work_sqls([ 
            to_sqlobj(sql_insert_tx,     {  "new_tx":           new_tx_obj, 
                                            "id_account":       id_account,
                                            }, 
                                            sql_fields='new_tx')
            ])
    if res[0][0]: return hash

async def cached_user_txs(db, id_user):
    accounts=await db.lazy_cache(
            f"list_accounts{id_user}",
            cache=10,
            func=lambda: db.async_pg_pool_work_sqls([ # async lambda
                    to_sqlobj(sql_select_txs_by_userid, 
                                    {"id_user":id_user })
                    ])
                )
    return accounts

def user_txs():
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs): #print(args, kwargs)
            request=args[0]
            token=request.token
            user=request.ctx.user
            db = request.app.config['db']
            request.ctx.user_txs=await cached_user_txs(db, user['id'])
            return await func(*args, **kwargs)
        return wrapper
    return decorator

def account_txs():
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs): #print(args, kwargs)
            request=args[0]
            token=request.token
            user=request.ctx.user
            txs=request.ctx.user_txs[0]
            body=kwargs['payload']
            id_account=body['id_account']
            db = request.app.config['db']
            found=db.found_in_list(txs, "id_account", id_account)
            if not found: return json({"content":[]},  status=403)
            request.ctx.account_txs=found
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

