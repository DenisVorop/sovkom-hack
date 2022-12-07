import time
# ИЗМЕРЯЕТ ИНТЕРВАЛ ВРЕМЕНИ  log_time('id') do() print(log_time('id'))

day1=60*60*24

import sys

class LogTimer:
    def __init__(self):
        self.log_timer = {}
        self.rps = {}
        self.rps_day={}
    # для теставремени загрузки страницы
    def log_request_time(self,id = 0):
        if not id in self.log_timer: self.log_timer[id]=time.time()
        log_time = time.time() - self.log_timer[id]
        self.log_timer[id] = time.time()
        return log_time
    @staticmethod
    def toFixed(numObj, digits=0):
        return f"{numObj:.{digits}f}"
    def log_time(self,id=None):
        return self.toFixed(self.log_request_time(id),6)
    def spent_time(self,id):
        return self.toFixed(time.time() - self.log_timer[id],6)

    # by minute
    def rps_count(self, tag='now', period=10,by_str=0, store_len=6*30, only_get=None):
        id = time.time(); id_day=str(int(id / day1)); id = str(int(id/period))
        if not tag in self.rps or len(list(self.rps[tag]))>store_len: self.rps[tag] = {'total30min':0}
        if not tag in self.rps_day or len(list(self.rps_day[tag]))>store_len: self.rps_day[tag] = {}
        if not id in self.rps[tag]: self.rps[tag][id] = 0
        if not id_day in self.rps_day[tag]: self.rps_day[tag][id_day] = 0
        if not only_get:
            self.rps[tag][id]+=1 ; 
            self.rps[tag]['total30min']+=1 ; 
            self.rps_day[tag][id_day]+=1 ;
        tot=self.rps[tag]['total30min'] ; 
        if by_str: return f'{self.rps[tag][id]},{period},30m:,{tot},1d:,{self.rps_day[tag][id_day]}'
        return [self.rps[tag], period]
            

#print(log_time('test')) time.sleep(3) print(log_time('test'))

def argv_exists(n):
    return n in sys.argv
def argv_get(n):
    v = sys.argv[sys.argv.index(n)+1].replace('"','')
    #print(v)
    return v
def argv_get_or_default(n, v=None, format=None):
    v = v if not argv_exists(n) else argv_get(n)
    if v and format: return format(v)
    return v


import os, sys

class HiddenPrints:
    def __enter__(self):
        self._original_stdout = sys.stdout
        sys.stdout = open(os.devnull, 'w')

    def __exit__(self, exc_type, exc_val, exc_tb):
        sys.stdout.close()
        sys.stdout = self._original_stdout