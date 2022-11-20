from fastapi import APIRouter
from fastapi import Depends, HTTPException, status, Request, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from routes.depends import get_current_user, get_current_user_temp_token, \
    get_current_user_refresh_token
import json, os

from services import auth_service
from schemas.auth_schema import Register, User, RefreshBase, \
    ForgottenPasswordForm, ChangePasswordForm, \
     UserRefreshToken, UsersMe, BanUnbanForm

import settings

from utils.hash import new_hash

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#import ujson 
def def_json_dumps(data):
    return json.dumps(data, ensure_ascii=False, default=str)

first_account_create_url=os.environ.get("TXS_SERVICE", "")

@router.post('/api/register')
async def register(register_data: Register):
    print(register_data)
    data = await auth_service.register(register_data)
    if 'res' in data:
        id_user = data['res']['id']
    return Response(status_code=data['status'], content=json.dumps(data, default=str))



@router.get('/api/confirm_email')
async def confirm_email(r: Request, cur_user: User=Depends(get_current_user)):
    return Response(status_code=200, content="hello")
    #return await auth_service.send_validating_email(cur_user.username)


@router.get('/api/approve_email')
async def verify_email(email: str):
    #return Response(status_code=200, content="ok")
    return await auth_service.verify_email_by_uuid(email)


@router.post("/api/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    access_token = await auth_service.authenticate_user(form_data.username,
                                                        form_data.password)
    print(access_token)
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return access_token

@router.post('/api/refresh_data')
async def refresh(current: UserRefreshToken=Depends(get_current_user_refresh_token)):
    """ return a new access token """
    print(current)
    return await auth_service.create_new_access_token(current.username, current.token)


@router.get("/api/users/me", response_model=UsersMe)
async def read_users_me(current_user: User = Depends(get_current_user)):
    print(current_user)
    return current_user

@router.get('/api/logout')
async def logout(current_user: User = Depends(get_current_user)):
    """ remove refresh token """
    print(current_user)
    print(await auth_service.logout(current_user.username))
    return Response(status_code=200, content=json.dumps({'status': 200, 'result': 'logout successful'}))





# отключена функциональность восстановления по паролю
@router.post('/api/forgot_password')
async def forgotten_password(current_user: ForgottenPasswordForm):
    new_password = new_hash()  
    status = await auth_service.change_password(Register(username=current_user.username,
                                                       password=new_password))
    return Response(status_code=200, content=def_json_dumps({"new_password": new_password, "status": status}))
# async def forgotten_password(user_data: ForgottenPasswordForm):
#     return "-"



@router.get('/api/restore_password')
async def forgotten_password(current_user: ForgottenPasswordForm):
    new_password = new_hash()  
    status = await auth_service.change_password(Register(username=current_user.username,
                                                       password=new_password))
    return Response(status_code=200, content=def_json_dumps({"new_password": new_password, "status": status}))
# async def forgotten_password(user_data: ForgottenPasswordForm):
#     return "-"
# async def send_temp_token(key: str):
#     return 'ok'
#     #return await auth_service.send_temporary_token(key)


@router.post('/api/change_password', status_code=200)
async def reset_password(password: ChangePasswordForm,
                         current_user: User = Depends(get_current_user)): #get_current_user_temp_token)):
    """ change user password to new """
    print(current_user, password)
    if password.delete_sessions:
        await auth_service.logout(current_user.username)
    return await auth_service.change_password(Register(username=current_user.username,
                                                       password=password.password))

@router.post('/api/admin/user_ban', status_code=200)
async def reset_password(user: BanUnbanForm,
                         admin: User = Depends(get_current_user)): #get_current_user_temp_token)):
    """ change user password to new """
    if not admin.is_admin: return Response(status_code=403, content="Not allowed")
    status = 'banned' if not user.unban else 'unbunned'
    try: await auth_service.set_ban_by_email(user.username, ban=not user.unban)
    except: return Response(status_code=403, content=def_json_dumps({"error":1}))
    return Response(status_code=200, content=def_json_dumps({"success":1, "desc": user.username + " is "+status}))

@router.post('/api/admin/approve_user', status_code=200)
async def approve_user(user: BanUnbanForm,
                         admin: User = Depends(get_current_user)): #get_current_user_temp_token)):
    """ change user password to new """
    if not admin.is_admin: return Response(status_code=403, content="Not allowed")
    try: await auth_service.set_approve_by_email(user.username)
    except Exception as e: return Response(status_code=403, content=def_json_dumps({"error":1, "desc": e}))
    return Response(status_code=200, content=def_json_dumps({"success":1}))

@router.get('/api/admin/list_users', status_code=200)
async def list_users(admin: User = Depends(get_current_user)): #get_current_user_temp_token)):
    """ change user password to new """
    if not admin.is_admin: return Response(status_code=403, content="Not allowed")
    return Response(status_code=200, content=def_json_dumps(await auth_service.admin_get_users_list()))

# async def logout():
#     """  """
#     res=None
#     if settings.api_key:
#         res = await auth_service.get_users_list()
#     return Response(status_code=200, content=def_json_dumps(res))







