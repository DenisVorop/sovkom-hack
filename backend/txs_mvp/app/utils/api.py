


import time
from functools import wraps
from sanic.response import text

# for edit
def remove_non_fields(d: dict):
    new_dict={}
    for n in d: 
        if d[n] is not None: 
            new_dict[n] = d[n]
    return new_dict

def filter_post_fields(filter_func=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs): # print(kwargs['payload'])
            kwargs['payload']=filter_func(kwargs['payload'])
            return func(*args, **kwargs)
        return wrapper
    return decorator

#fields_keys=lambda fields: ','.join(list(fields.keys()))
fields_markers=lambda fields, shift=0: ','.join([f'${i+shift+1}' for i,_ in enumerate(fields)])
#to_sqlobj=lambda func, obj: [func(obj), list(obj.values())]

def sql_cache_schema(fields):
    return f"""
SELECT column_name FROM information_schema.columns WHERE table_name = {fields_markers(fields)} AND table_schema = 'public'
    """
def sql_cache_schema_to_list(res): return ','.join([el['column_name'] for el in res])


lazy_cache_funcs={}
lazy_cache_def_pause=5  # 60*60*24

@staticmethod
def lazy_cache(cache=lazy_cache_def_pause, id=None, id_is_token=None):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs): #print(args, kwargs)
            print('lazy_cache func')
            if id_is_token:
                request=args[0]
                token=request.token
                if token and len(token) > 3:
                    key=token+str(id_is_token)
                else: 
                    return text("403 lazy",  status=403)
            else:
                key = id or (str(args) + str(kwargs))
            if not key in lazy_cache_funcs or (cache and time.time()-lazy_cache_funcs[key]['time']>=cache): 
                init_func = lambda: func(*args, **kwargs)
                content = await init_func
                if content:
                    lazy_cache_funcs[key]={"time":time.time(), 
                                           'content':content,
                                           'func': init_func }
                return content
            else: return lazy_cache_funcs[key]['content']
        return wrapper
    return decorator





def lazy_cache_by_token(cache=lazy_cache_def_pause, id_by_token=None):
    return lazy_cache(cache=cache, id_is_token=id_by_token)
