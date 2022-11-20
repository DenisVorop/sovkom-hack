
from sanic.response import text, json as json, redirect
from functools import wraps
import httpx, os


auth_service = os.environ.get("AUTH_SERVICE_URL","")

async def user_auth(token):
    print('load')
    try:
        async with httpx.AsyncClient() as client:
            r=await client.get(auth_service, headers={"Authorization": f"Bearer {token}"})
        res=r.json()
    except Exception as e: 
        return {'error':e}
    if 'id' in res: return res

    

# проверка авторизации / админа
def if_user(cache_auth=0, admin=False):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs): #print(args, kwargs)
            request=args[0]
            token=request.token
            if not token: return text("403",  status=403)
            print(token)

            # TODO: не оптимизирован кеш
            if cache_auth:
                db=request.app.config['db']
                user= await db.lazy_cache(token, # id
                                          cache=cache_auth, # 5
                                          func=lambda: user_auth(token)) # async lambda
            else: user=await user_auth(token)
            print(user)
            if not user or not 'id' in user or admin and not user['is_admin']: 
                return text("403",  status=403)
            request.ctx.user=user
            return await func(*args, **kwargs)
        return wrapper
    return decorator

