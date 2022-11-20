import json
import asyncio

from redis_app.redis import init_redis_pool

async def set_refresh_token(user_name, refresh_token, time):
    redis = await init_redis_pool()
    await redis.set(user_name, refresh_token, time)


async def get_refresh_token(user_name):
    redis = await init_redis_pool()
    token = await redis.get(user_name)
    return token


async def delete_refresh_key(user_name):
    redis = await init_redis_pool()
    await redis.delete(user_name)


async def set_validating_token(url_code, user_name, access_token_expires):
    #redis_email_pool = await get_email_redis_pool()
    #return await redis_email_pool.set(url_code, user_name, access_token_expires)
    return 'ok'


async def get_validating_token(code):
    #redis_email_pool = await get_email_redis_pool()
    #resp = await redis_email_pool.get(code)
    #await redis_email_pool.delete(code)
    #return resp
    return 'ok'