from aioredis import Redis, from_url

from settings import RedisConfig


async def init_redis_pool() -> Redis:
    print(RedisConfig.URL)
    redis = await from_url(
        RedisConfig.URL,
        encoding="utf-8",
        db=RedisConfig.DB,
        decode_responses=True,
        password=RedisConfig.PASSWORD
    )
    return redis