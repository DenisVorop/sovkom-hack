import os, sys, random, asyncio ; sys.path.append('./') ; sys.path.append('../')
from sanic import Request, Sanic, json
from sanic.response import text, redirect
from sanic_cors import CORS, cross_origin

app = Sanic("TXS") # init app
#app.update_config({"RESPONSE_TIMEOUT": 2000 }) # https://sanic.dev/en/guide/deployment/configuration.html#using-sanic-update-config

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


########################################################
#from db import DB; db = DB()
#from services import init_interfaces; Interfaces=init_interfaces(app)

# подгрузка настроек
@app.before_server_start # @app.listener('before_server_start') # info
async def setup_db(app, loop): 
    pass

@app.after_server_stop
async def exit_db(app, loop): 
    await db.async_pg_close_pools(app,loop)

#from routes import API; API(app, Interfaces) # подключение api

from processes import get_codes, get_courses, get_graph

@app.route("/api/cache/codes/centrobank", methods=["GET"])
async def centrobank_codes(request):
    return json(await get_codes.centrobank())

@app.route("/api/cache/courses/daily", methods=["GET"])
async def daily_courses(request):
    return json(await get_courses.get_courses_daily())

@app.route("/api/cache/courses/apilayer", methods=["GET"])
async def courses_apilayer(request):
    return json(await get_courses.get_courses_apilayer())

@app.route("/api/cache/graph/yahoo", methods=["POST"])
async def courses_apilayer(request):
    return json(await get_graph.get_graph_yahoo("EUR"))

@app.route("/api/cache/graph/apilayer", methods=["POST"])
async def courses_apilayer(request):
    return json(await get_graph.get_graph_apilayer())


########################################################

if __name__ == '__main__': app.run(host="0.0.0.0", # important for docker
            port=os.environ.get('API_PORT', 3000))