
import httpx, os, time
from urllib.parse import urlencode

from db import DB; db = DB()

API_KEY_apilayer_currency_data = os.environ.get('API_KEY_apilayer_currency_data','')
apilayer_currency_data_CACHE_FLAG = os.environ.get('apilayer_currency_data_CACHE_FLAG',False)
grpah_yahoo_CACHE_FILE_FLAG = os.environ.get('grpah_yahoo_CACHE_FILE_FLAG',False)

def url_timeframe_apilayer( base="USD", 
                            currencies_list="", 
                            start_date="2021-10-01", 
                            end_date="2022-01-01"):
    return ('https://api.apilayer.com/currency_data/timeframe?&source='
            f'{base}&currencies={currencies_list}&start_date={start_date}&end_date={end_date}'
            )
        


async def get_graph_apilayer(cache=apilayer_currency_data_CACHE_FLAG, 
                                base="USD",
                                start_date="2021-10-01", 
                                end_date="2022-01-01"):
    file_timeframe_apilayer=f"timeframe_apilayer_{start_date}_{end_date}.json"
    if cache:
        print('cached')
        try: return await db.read_file(file_timeframe_apilayer, use_def_dir=True)
        except: pass
    
    async with httpx.AsyncClient() as client:
        r=await client.get(url_timeframe_apilayer(base), headers={"apikey":API_KEY_apilayer_currency_data})

    
    if r.status_code==200:
        res= r.json()['quotes']
        await db.async_save_file(file_timeframe_apilayer, res, use_def_dir=True)
    else: return r.text

    return res


time_year=60*60*24*31*365

# https://query1.finance.yahoo.com/v8/finance/chart/USDJPY=X
"""
yahoo_valid_intervals = [
    '1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '1wk', '1mo', '3mo'
    ]

time_updating_map = {
    '30m': 1800000,
    '1h': 1800000,
    '24h': 43200000,
    '1d': 43200000,
    '7d': 302400000
}

yahoo_interval_map = {
    '1h': '30m',
    '24h': '1d',
    '1d': '1d',
    '7d': '1wk'
}

"""

def url_graph_yahoo(to_code, from_code="USD"):
    return f"https://query1.finance.yahoo.com/v8/finance/chart/{from_code}{to_code}=X"

async def get_graph_yahoo(      to_code,
                                cache=grpah_yahoo_CACHE_FILE_FLAG, 
                                from_code="USD",
                                start_time=None, 
                                end_time=None,
                                interval=None):

    
    obj = {
    "region": "US", 
    "lang": "en-US", 
    "period1": 1668310504, 
    "period2": 1668810504, 
    "includePrePost": "false", 
    "interval": "30m", 
    "corsDomain": "finance.yahoo.com", 
    ".tsrc": "finance"
    }
    obj['period1'] = int(start_time or (time.time() - time_year))
    obj['period2'] = int(end_time or time.time())
    obj['interval'] = interval or "1d" or "30m"
    
    file_graph_yahoo=f"graph_yahoo_{from_code}{to_code}_{interval}_{start_time}_{end_time}.json"
    if cache:
        print('cached')
        try: return await db.read_file(file_graph_yahoo, use_def_dir=True)
        except: pass
    
    url = url_graph_yahoo(to_code=to_code, from_code=from_code) +"?"+ urlencode(obj)
    print (url)
    async with httpx.AsyncClient() as client:
        r=await client.get(url)

    if r.status_code==200:
        res= r.json()
        await db.async_save_file(file_graph_yahoo,res, use_def_dir=True)
    else: return r.text

    return res

