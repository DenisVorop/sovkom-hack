import os, sys, random, asyncio ; sys.path.append('./') ; sys.path.append('../')
from sanic import Request, Sanic, json
from sanic.response import text, redirect
from sanic_cors import CORS, cross_origin

app = Sanic("TXS") # init app
#app.update_config({"RESPONSE_TIMEOUT": 2000 }) # https://sanic.dev/en/guide/deployment/configuration.html#using-sanic-update-config

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


########################################################
from db import DB; db = DB()
from services import init_interfaces; Interfaces=init_interfaces(app)

# подгрузка настроек
@app.before_server_start # @app.listener('before_server_start') # info
async def setup_db(app, loop): 
    await db.async_pg_create_pool(app, loop)
    await Interfaces.preload_settings()
    #i = Interfaces.RedirectVideoService
    #x=i.StartAsThread_Worker( i.WorkerBlanaceForgotten, () ) # сервис контроля истории балансировки

@app.after_server_stop
async def exit_db(app, loop): 
    await db.async_pg_close_pools(app,loop)

#from routes import API; API(app, Interfaces) # подключение api


# подключение api
from routes.account import InitRoutes as x; x(app, Interfaces)
from routes.tx import InitRoutes as x; x(app, Interfaces)

########################################################

if __name__ == '__main__': app.run(host="0.0.0.0", # important for docker
            port=os.environ.get('API_PORT', 3000))