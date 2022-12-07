
import os, sys, time, datetime; from pytz import timezone
if not 'TZ' in os.environ: os.environ['TZ'] = 'Europe/Moscow' 

def now_date():
    return datetime.datetime.now().astimezone(timezone(os.environ['TZ']))
def now_time():
    return now_date().timestamp()
def time_step():
    return [now_date(), now_time()]


import asyncio, json, httpx, time
#from aiocfscrape import CloudflareScraper

TIMEOUT_FOR_ELSEWARE = 10
TIMEOUT_FOR_REQUEST = 5

async def get_page_HTTPX(session, url, is_json=False, timeout=TIMEOUT_FOR_REQUEST, id=None):
    tim=time.time();start_load=time_step()
    try: 
        resp = await session.get(url)#, timeout=timeout)
        # resp.raise_for_status()
        if not resp: return { 'res': None, 'headers': None,  'time': time.time()-tim, 'start_load': start_load, 'end_load':time_step(), 'code':0 }
        if is_json: ans = resp.json()
        else: ans = resp.text
        return { 'res': ans, 'headers': resp.headers, 'time':time.time()-tim, 'code': resp.status_code, 'start_load': start_load, 'end_load':time_step() }
    except Exception as e: #httpx.HTTPError as e:
        e = e if e and len(str(e))>2 else 'some err'
        t = time.time()-tim
        print(id, '{:.2f}'.format(t), e)
        return  { 'res': None, 'headers':None, 'time': t, 'err':e, 'code': -1 if t>timeout else 0 }

async def get(session, url, options=None, method=None, func=None, collect_func=None, id=None, timeout=None):
    if len(url)>1: options.update(url[1])
    if 'func' in options: func = options['func']
    res=await method(session, 
                    url[0], 
                    is_json=False if not 'is_json' in options or not options['is_json'] else options['is_json'],
                    id=id,
                    timeout=timeout)
    if func: out=func(res=res, options=options, id=id)
    else: out=None
    if collect_func: collect_func(id, res if not func else out)



async def main_HTTPX(urls, func, options, collect_func, timeout=None): #async with aiohttp.ClientSession() as session:
    print('timeouts',timeout)
    async with httpx.AsyncClient(timeout=timeout) as session: #new_timeout_HTTPX(req=timeout[0], els=timeout[1])) as session: # session=None
        ret = await asyncio.gather(*[get(session=session, url=url, method=get_page_HTTPX, func=func, options=options, collect_func=collect_func, id=i, timeout=timeout) for i,url in enumerate(urls)])
    print("Finalized all. Return is a list of len {} outputs.".format(len(ret)))

def init_async(urls=None, func=None, collect_func=None, options=None, method=None, is_json=False, timeout=None, return_stats=None):
    collect=[]; success=[]; fail=[]; start_load=time_step(); tim=time.time()
    if not options: options={}
    if not 'is_json' in options: options['is_json'] = is_json
    method=main_HTTPX if not method else method
    if not collect_func: collect_func=lambda id,res: (fail.append(id) if 'err' in res else success.append(id)) or collect.append({'id':id, 'res':res}) #(collect[i]=res)
    asyncio.run(method(urls=urls, func=func, options=options, collect_func=collect_func, timeout=timeout))
    if return_stats: return { "timeout": timeout or TIMEOUT_FOR_REQUEST,"time": time.time()-tim, "start_load":start_load, "end_load":time_step(), 'total_success_fail':[len(urls), len(success), len(fail)], "success":success, "fail":fail, "urls": urls, "content": collect }
    return collect

async def async_method_for_eventloop(urls=None, func=None, collect_func=None, options=None, method=None, is_json=False, timeout=None, return_stats=None):
    collect=[]; success=[]; fail=[]; start_load=time_step(); tim=time.time()
    if not options: options={}
    if not 'is_json' in options: options['is_json'] = is_json
    method=main_HTTPX if not method else method
    if not collect_func: collect_func=lambda id,res: (fail.append(id) if 'err' in res else success.append(id)) or collect.append({'id':id, 'res':res}) #(collect[i]=res)
    (await method(urls=urls, func=func, options=options, collect_func=collect_func, timeout=timeout))
    if return_stats: return { "timeout": timeout or TIMEOUT_FOR_REQUEST, "time": time.time()-tim, "start_load":start_load, "end_load":time_step(), 'total_success_fail':[len(urls), len(success), len(fail)], "success":success, "fail":fail, "urls": urls, "content": collect }
    return collect


# from utils.gather_async import init_async, async_method_for_eventloop
# import time 

# url='http://0.0.0.0:3200/?video=http://s1.origin-cluster/video/1488/xcg2djHckad.m3u8'
# urls = [[url] for i in range(0,1000)]

# # асинхронно загружает N
# t0=time.time()
# res=init_async(urls)

# codes={}

# def count_codes(c):
#     c=str(c); codes[c]=1 if not c in codes else codes[c]+1
# test=[count_codes('main' if ("//s1." in el['res']['headers']['location']) else 'cdn') for el in res]  #el['res']['code']) for el in res]

# print(len(res), '{:.2f}'.format(time.time()-t0), 'secs')
# print(codes, '{:2f}'.format(codes['cdn']/(len(res))*100),'%') # вывод пропроции %