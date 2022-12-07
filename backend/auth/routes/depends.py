import asyncio
import datetime
import uuid
from datetime import datetime

import pydantic
from fastapi import Depends, Header, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from starlette import status
from passlib.context import CryptContext
from jose import JWTError, jwt
from settings import Jwt

from services.managers import pg_manager
from schemas.auth_schema import User, TokenData, UserRefreshToken

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def raise_credentials_exception(detail: str="Could not validate credentials"):
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )

async def _get_current_user(token, jwt_secret_key, return_model: pydantic.BaseModel):
    try:
        payload = jwt.decode(token, jwt_secret_key, algorithms=Jwt.ALGORITHM)
        username: str = payload.get("sub")
        if username is None:
            raise_credentials_exception()
        token_data = TokenData(username=username,
                               expired = payload.get("exp", 0))
        if token_data.expired < datetime.utcnow().timestamp():
            raise_credentials_exception("Token expired")
    except JWTError as e:
        raise_credentials_exception()
    user = await pg_manager.get_user(token_data.username)
    if user is None or user['ban']:
        raise_credentials_exception()
    user = return_model(**user, token=token)
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    return await _get_current_user(token, Jwt.SECRET_KEY, User)


async def get_current_user_refresh_token(token: str = Depends(oauth2_scheme)):
    return await _get_current_user(token, Jwt.SECRET_KEY, UserRefreshToken)


async def get_current_user_temp_token(token: str = Depends(oauth2_scheme)):
    return await _get_current_user(token, Jwt.TEMP_SECRET_KEY, User)
