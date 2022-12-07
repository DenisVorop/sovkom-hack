from os import environ
import hashlib

class PostgreSqlConfig:
    DATABASE_URL = "postgres://{user}:{password}@{host}:{port}/{database}".format( # "mysql+asyncmy://root:mysqlpass@localhost:3306/test"
    user=environ.get('POSTGRES_USER','postgres'), 
    password=environ.get('POSTGRES_PASSWORD','password'), 
    host=environ.get('psql_host', '0.0.0.0'),
    port=environ.get('psql_port', 5432), 
    database=environ.get('POSTGRES_DB', 'main'),
    )


class RedisConfig:
    URL = environ.get('REDIS_URL', 'redis://localhost:6377')
    DB = '0'
    EMAIL_DB = '1'
    RESTORE_EMAIL_DB = '2'
    PASSWORD = environ.get('REDIS_PASSWORD',"")


class Jwt:
    SECRET_KEY = environ.get('JWT_KEY',
                 "")
    ALGORITHM = environ.get('JWT_ALGORITM', "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(environ.get('JWT_EXPIRATION_TIME_MIN', 10))
    REFRESH_TOKEN_EXPIRE_HOURS = int(environ.get('REFRESH_TOKEN_EXPIRE_HOURS', 72))
    # hash for changing password case
    TEMP_SECRET_KEY = str(hashlib.sha256(SECRET_KEY.encode()).hexdigest())


EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES =2160
RESTORE_PASSWORD_TOKEN_EXPIRE_MINUTES =30
SITE_NAME = environ.get('SITE_HOST', 'https://localhost')
SITE_DOMAIN = SITE_NAME.split('//')[-1]
REDIRECT_HOST=environ.get('REDIRECT_HOST', 'https://localhost')

api_key = environ.get('API_KEY', '1')  # 'dumps/'
