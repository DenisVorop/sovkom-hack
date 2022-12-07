
import httpx, os

from db import DB; db = DB()

API_KEY_apilayer_currency_data = os.environ.get('API_KEY_apilayer_currency_data','')
apilayer_currency_data_CACHE_FLAG = os.environ.get('apilayer_currency_data_CACHE_FLAG',False)

url_daily = 'https://www.cbr-xml-daily.ru/daily_json.js'
def url_LIVE_COURSE_apilayer_currency_data(base='USD', symbols=''): 
    return 'https://api.apilayer.com/currency_data/live?base={base}&symbols={symbols}'

def daily_courses_convert(courses):
    out={} ; RUBUSD = 60
    if "USD" in courses: USD=courses['USD']['Value']/courses['USD']['Nominal']
    for code in courses:
        valute = courses[code]
        value  = valute['Value']
        nominal= valute['Nominal']
        # out[code]={
        #     "value": 1/((1/float(RUBUSD)) / (value / nominal)),
        #     "default": value / nominal
        # }
        out[code] = 1/((1/float(RUBUSD)) / (value / nominal))
    return out

def apilayer_courses_convert(courses, base):
    out={} ; RUBUSD = 60
    #if "USDRUB" in courses: RUBUSD=courses['USDRUB']
    for code in courses:
        out[code.replace(base,'')]=courses[code]
    return out

async def get_courses_daily():
    async with httpx.AsyncClient() as client:
        r=await client.get(url_daily)
    return daily_courses_convert(r.json()['Valute'])
   

file_live_courses_apilayer = "live_courses_apilayer.json"
async def get_courses_apilayer(cache=apilayer_currency_data_CACHE_FLAG, base="USD"):

    if cache:
        print('cached')
        try: return await db.async_read_file(file_live_courses_apilayer, use_def_dir=True)
        except: pass
    
    async with httpx.AsyncClient() as client:
        r=await client.get(url_LIVE_COURSE_apilayer_currency_data(base), headers={"apikey":API_KEY_apilayer_currency_data})
    res= apilayer_courses_convert(r.json()['quotes'], base)
   
    await db.async_save_file(file_live_courses_apilayer, res, use_def_dir=True)

    return res

