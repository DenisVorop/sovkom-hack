import time
from functools import wraps

tickets={}

class Ticket:
    def __init__(self, id="global", time_expire=30*60, time_block=10): 
        self.id = id
        self.time_expire = time_expire
        self.time_block = time_block

        if not self.id in tickets: tickets[self.id] = {}
    def new_ticket(self, t):
        return {
            "init_time": t,
            "accept_time": 0
            }
    def get_ticket(self, id=0, 
                        accept=False, 
                        time_block=None, 
                        time_expire=None): 
        if not id: return "block"
        id=str(id)
        ticket=tickets[self.id] ; t=time.time()
        if not id in ticket: ticket[id]=self.new_ticket(t)
        if ticket[id]['accept_time'] and (delta:=(time_block or self.time_block) - (t - ticket[id]['accept_time'])) >0: 
            return f"wait {int(delta)} {id}"
        if ticket[id]['init_time']>(time_expire or self.time_expire) or ticket[id]['accept_time']: 
            ticket[id]=self.new_ticket(t) # new
        if accept: ticket[id]["accept_time"] = t
        return "fine"

    def garbage(self):
        t=time.time()
        for id in tickets[self.id]:
            if tickets[self.id][id]["accept_time"] and \
               t-tickets[self.id][id]["accept_time"]>self.time_expire:
                del tickets[self.id][id]

def init_ip_pause_block(id="ip_checks", 
                        func_return=None,  
                        time_block=10, 
                        time_expire=30*60,
                        by_endpoints=True):
    
    ticket=Ticket(id=id, 
                time_block=time_block, 
                time_expire=time_expire)

    def ip_pause_block(time_block=None, 
                        time_expire=None, 
                        func_return=func_return):
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs): #print(args, kwargs)
                request=args[0]
                id = str(request.ip)
                if by_endpoints: id += " " + str(args) + str(kwargs)
                res=ticket.get_ticket(id=id, 
                                    accept=True, 
                                    time_block=time_block,
                                    time_expire=time_expire)
                if 'wait' in res: 
                    if func_return: return func_return(res)
                    else: return res
                return func(*args, **kwargs)
            return wrapper
        return decorator
    return ip_pause_block

# @app.get("/api/accept_ticket")
# @ip_pause_block(time_block=10, func_return=json) # return json(ticket.get_ticket(str(request.ip), accept=True)) 
# async def accept_ticket(request):
#     return json('test')
#     pass
#     # return json(ticket.get_ticket(str(request.ip), accept=True)) 


