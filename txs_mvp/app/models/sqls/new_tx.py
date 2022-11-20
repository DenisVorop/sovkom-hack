



fields_keys=lambda fields: ','.join(list(fields.keys()))
fields_markers=lambda fields, shift=0: ','.join([f'${i+shift+1}' for i,_ in enumerate(fields)])
to_sqlobj=lambda func, obj, sql_fields=None: [func(obj), list(obj.values())] if sql_fields is None else  [func(obj), list(obj[sql_fields].values())] 



def sql_insert_tx(obj):
    fields=fields_keys(obj['new_tx'])
    markers=fields_markers(obj['new_tx'])
    id_account=obj['id_account']
    return f'''
WITH first_insert AS (
INSERT INTO txs ({fields}, date_created)
VALUES ({markers}, NOW())
RETURNING id, date_created
)
INSERT INTO con_account_txs (id_account, id_tx)
VALUES ( '{id_account}' , (select id from first_insert)
        )
RETURNING id_tx 

'''

def sql_select_txs_by_userid(obj):
    fields=fields_keys(obj)
    markers=fields_markers(obj)
    return ('''select cc.*,tx.* from con_user_accounts as c '''
            '''LEFT JOIN account as a on a.id = c.id_account  ''' 
            '''LEFT JOIN con_account_txs as cc on a.id = cc.id_account '''
            '''LEFT JOIN txs as tx on tx.id = cc.id_tx ''' 
            f'''WHERE c.id_user = $1 ''' 
            '''ORDER BY date_created DESC''' # OFFSET $2 LIMIT $3'''
        )


def sql_select_account_by_userid(obj):
    fields=fields_keys(obj)
    markers=fields_markers(obj)
    return ('''select c.*, a.* from con_user_accounts as c '''
            '''LEFT JOIN account as a on a.id = c.id_account ''' 
            f'''WHERE c.id_user = $1 ''' 
            '''ORDER BY date_created DESC''' # OFFSET $2 LIMIT $3'''
        )


def sql_select_by_hash(obj):
    fields=fields_keys(obj)
    markers=fields_markers(obj)
    return f'''select * from txs where tx_hash = {markers} LIMIT 1'''

def sql_select_all(obj):
    fields=fields_keys(obj)
    markers=fields_markers(obj)
    return f'''select * from txs ORDER BY date_created DESC OFFSET $1 LIMIT $2'''




