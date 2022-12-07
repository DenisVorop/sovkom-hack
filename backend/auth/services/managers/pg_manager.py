from pydantic import UUID4
import json

from sql_app.database import connect, close


def pg_records_to_dict(records):
    return [dict(record) for record in records]

def pg_records_to_dict_WITHOUT_names(records):
    return [[dict(record)[el] for el in dict(record)] for record in records]
#pg_records_to_dict_WITHOUT_names

async def get_user(user_name):
    curr = await connect()
    data = await curr.fetch("select * from users where username = $1 and ban is not TRUE", user_name)
    await curr.close()
    try:
        return data[0]
    except IndexError:
        return None


async def create_user(username, password, firstname, lastname, is_admin=False):
    curr = await connect()

    res=await curr.fetch(
        "insert into users (username, password, email_virified, firstname, lastname, is_admin) "
        "values($1, $2, $3, $4, $5, $6) RETURNING id", username, password, False, firstname, lastname, is_admin
    )

    await curr.close()
    return pg_records_to_dict(res)[0]

async def select_users():
    curr = await connect()
    data = await curr.fetch("select id, username, firstname, lastname, date_created, is_admin, ban, email_virified, approved_by_admin from users")
    await curr.close()
    try:
        return pg_records_to_dict(data)
    except IndexError:
        return None

async def change_user_password(username: str, password: str):
    curr = await connect()
    await curr.execute("UPDATE users set password=$1, email_virified = true where username=$2", password, username)
    await curr.close()


async def approve_user_email(username):
    curr = await connect()
    await curr.execute(f"update users set email_virified=TRUE where username='{username}';")
    await curr.close()


async def auth_user(user_name, password):
    curr = await connect()
    user = await curr.fetch("select * from users where username = $1 and password = $2", user_name, password)
    await curr.close()
    print(user)


# async def set_ban(user_id: UUID4, ban=True):
#     ban = 'TRUE' if ban else 'FALSE'
#     curr = await connect()
#     await curr.execute(f"update users set ban = {ban} where id = $1", user_id)
#     await curr.close()

async def set_ban_by_email(username: str, ban=True):
    ban = 'TRUE' if ban else 'FALSE'
    curr = await connect()
    await curr.execute(f"update users set ban = {ban} where username = $1", username)
    await curr.close()

async def set_approve_by_email(username: str, approved=True):
    approved = 'TRUE' if approved else 'FALSE'
    curr = await connect()
    await curr.execute(f"update users set approved_by_admin = {approved} where username = $1", username)
    await curr.close()


async def get_userdata_by_username(username: str):
    curr = await connect()
    resp = await curr.fetch("select userdata, id from users where username=$1;", username)
    await curr.close()
    return resp[0]


