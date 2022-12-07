import asyncpg


from settings import PostgreSqlConfig


async def connect():
    print('connect',PostgreSqlConfig.DATABASE_URL)
    conn = await asyncpg.connect(PostgreSqlConfig.DATABASE_URL)
    return conn


async def close(conn):
    await conn.close()
