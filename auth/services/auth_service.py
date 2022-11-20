import json

from fastapi.security import OAuth2PasswordBearer
import uuid
from fastapi import HTTPException, status

from datetime import timedelta
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime

import settings
from services.managers import pg_manager, redis_manager
from settings import Jwt, EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES, \
    SITE_NAME, RESTORE_PASSWORD_TOKEN_EXPIRE_MINUTES, api_key
from schemas.auth_schema import RoleBase, Register, User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
from typing import Optional

async def get_users_list():
    users = await pg_manager.select_users()
    return {"len":len(users),"content":users}

async def get_user_by_email(email):
    return await pg_manager.get_user(email)


async def register(user_data: Register):
    user = await pg_manager.get_user(user_data.username)

    if user:
        return {"status": 400, "exists": True, "result": "user already exists"} # 400 Bad request
    else:
        password = await get_password_hash(user_data.password)

        res=await pg_manager.create_user(user_data.username, password, user_data.firstname,
                                     user_data.lastname, user_data.is_admin)


        #await set_group_rights(SetGroupForm(username=user_data.username, roles=roles))


        # resp = await send_validating_email(user_data.username)
        # print(resp)
        return {"status": 200, "exists": False, "result": "registration success", "res":res}





async def verify_email_by_uuid(username: str):
    # redis_email_pool = await get_email_redis_pool()
    # user = await redis_email_pool.get(id_link)
    # await redis_email_pool.delete(id_link)
    print(username)
    try:
        await pg_manager.approve_user_email(username)
        # отправка успешного сообщения, после подтверждения
        # try: code = await send_success_email(user)
        # except Exception as e: code= None

        return {"status": 200,"result": "Success"}
    except Exception as e:
        return {"status": 200, "result": "Fail"}


async def update_tokens(user_name: str):
    access_token_expires = timedelta(minutes=Jwt.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub": user_name}, expires_delta=access_token_expires
    )
    refresh_token = await create_refresh_token(user_name)
    await redis_manager.set_refresh_token(user_name, refresh_token, 21600)
    return {"access_token": access_token, 'refresh_token': refresh_token,
            "token_type": "bearer"}


async def authenticate_user(user_name: str, password: str) -> dict | None:
    user = await pg_manager.get_user(user_name)
    if user is None: return None
    valid = await verify_password(password, user['password'])
    if valid: return await update_tokens(user['username'])


async def create_new_access_token(user_name: str, token: str) -> dict:
    await verify_refresh(user_name, token)
    return await update_tokens(user_name)


async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None,
                              jwt_secret_key=Jwt.SECRET_KEY):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, jwt_secret_key, algorithm=Jwt.ALGORITHM)
    return encoded_jwt


async def create_refresh_token(user_name: str):
    to_encode = {'key': str(uuid.uuid4()), 'sub': user_name}
    to_encode.update({"exp": datetime.utcnow() + timedelta(
        hours=settings.Jwt.REFRESH_TOKEN_EXPIRE_HOURS)})
    encoded = jwt.encode(to_encode, Jwt.SECRET_KEY, algorithm=Jwt.ALGORITHM)
    return encoded


async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def get_password_hash(password):
    return pwd_context.hash(password)


async def verify_refresh(user_name, token):
    existing_refresh_token = await redis_manager.get_refresh_token(user_name)
    if token != existing_refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def logout(user_name):
    await redis_manager.delete_refresh_key(user_name)




# async def send_temporary_token(key):
#     user_name = await redis_manager.get_validating_token(key)
#     if user_name:
#         access_token_expires = timedelta(minutes=settings.EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES)
#         access_token = await create_access_token(
#             data={"sub": user_name}, expires_delta=access_token_expires,
#             jwt_secret_key=Jwt.TEMP_SECRET_KEY
#         )
#         return {"access_token": access_token, "token_type": "bearer"}
#     else:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                              detail="Resource doesn't exist")


async def change_password(user_data: Register):
    password = await get_password_hash(user_data.password)
    await pg_manager.change_user_password(user_data.username, password)
    return {'status': 200, 'result': 'success'}


async def set_ban_by_email(username, ban=True):
    #print(username)
    return await pg_manager.set_ban_by_email(username,ban)


async def set_approve_by_email(username):
    #print(username)
    return await pg_manager.set_approve_by_email(username)

async def admin_get_users_list():
    return await pg_manager.select_users()

