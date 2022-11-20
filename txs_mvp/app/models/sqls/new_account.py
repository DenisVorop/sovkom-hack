



fields_keys=lambda fields: ','.join(list(fields.keys()))
fields_markers=lambda fields, shift=0: ','.join([f'${i+shift+1}' for i,_ in enumerate(fields)])
to_sqlobj=lambda func, obj, sql_fields=None: [func(obj), list(obj.values())] if sql_fields is None else  [func(obj), list(obj[sql_fields].values())] 



def sql_insert_account(obj):
    fields=fields_keys(obj['new_account'])
    markers=fields_markers(obj['new_account'])
    id_user=obj['id_user']
    return f'''
WITH first_insert AS (
INSERT INTO account ({fields}, date_created, date_updated)
VALUES ({markers}, NOW(), NOW())
RETURNING id, date_created, date_updated
)
INSERT INTO con_user_accounts (id_user, id_account)
VALUES ( '{id_user}' , (select id from first_insert)
        )
RETURNING id_account 

'''


def sql_delete_account(obj):
    fields=fields_keys(obj)
    markers=fields_markers(obj)
    return f'''
UPDATE account SET date_deleted = NOW()
  WHERE id = $1 RETURNING id
'''


def sql_select_account_by_userid(obj):
    fields=fields_keys(obj)
    markers=fields_markers(obj)
    return ('''select c.*, a.* from con_user_accounts as c '''
            '''LEFT JOIN account as a on a.id = c.id_account ''' 
            f'''WHERE c.id_user = $1 ''' 
            '''ORDER BY date_created DESC''' # OFFSET $2 LIMIT $3'''
        )

def sql_select_account_by_accountid(obj):
    fields=fields_keys(obj)
    markers=fields_markers(obj)
    return ('''select * from account  '''
            f'''WHERE id = $1 ''' 
            '''ORDER BY date_created DESC''' # OFFSET $2 LIMIT $3'''
        )

