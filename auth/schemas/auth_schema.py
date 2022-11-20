from pydantic import BaseModel, EmailStr, UUID4, validator
from typing import Optional, Union, List
import json
from fastapi import Form

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    expired: Optional[int]

class User(BaseModel):
    id: UUID4
    username: EmailStr
    userdata: Optional[Union[str, dict]]
    email_virified: Optional[bool]
    approved_by_admin: Optional[bool]
    ban: Optional[bool]
    is_admin: Optional[bool]


    @validator('userdata')
    def check_1(cls, a):
        if isinstance(a, str):
            return json.loads(a)


class UsersMe(BaseModel):
    id: UUID4
    username: str
    userdata: Optional[dict] = dict()
    email_virified: Optional[bool]
    approved_by_admin: Optional[bool]
    is_admin: Optional[bool]
    ban: Optional[bool]



class UserRefreshToken(BaseModel):
    id: UUID4
    username: EmailStr
    userdata: Optional[Union[str, dict]]
    email_virified: Optional[bool]
    approved_by_admin: Optional[bool]
    is_admin: Optional[bool]
    token: Optional[str]

    @validator('userdata')
    def check_1(cls, a):
        if isinstance(a, str):
            return json.loads(a)


class UserInDB(User):
    hashed_password: str


class Register(BaseModel):
    username: EmailStr
    firstname: str = ''
    lastname: str = ''
    password: str | bytes
    is_admin: Optional[bool]

    @classmethod
    def as_form(
            cls,
            username: str = Form(...),
            password: str | bytes = Form(1)
    ):
        return cls(username=username, password=password)


class RefreshBase(BaseModel):
    # username: EmailStr
    token: str


class RoleBase(BaseModel):
    username: EmailStr
    groups: list


class ForgottenPasswordForm(BaseModel):
    username: EmailStr
    ignore_mail_test_route: Optional[bool]


class BanUnbanForm(BaseModel):
    username: EmailStr
    unban: Optional[bool]


class ChangePasswordForm(BaseModel):
    password: str
    delete_sessions: Optional[bool]