



from functools import wraps

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
