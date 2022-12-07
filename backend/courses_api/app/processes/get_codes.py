
from os import environ
import httpx, xmltodict

url_centrobank_codes='http://www.cbr.ru/scripts/XML_valFull.asp'

async def centrobank():
    async with httpx.AsyncClient() as client:
        r=await client.get(url_centrobank_codes)
    
    print(r.text)
    data = xmltodict.parse(r.text)
    items= data['Valuta']['Item']
    return [i['ISO_Char_Code'] for i in items]
 