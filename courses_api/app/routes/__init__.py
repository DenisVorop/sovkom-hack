


#from routes.redirect import InitRedirect
#from routes.settings import InitSettings
#from routes.txs import InitTxs
cls=[
        #InitRedirect,
        #InitSettings,
        #InitTxs
    ]
# interface
class API:
    def __init__(self, app, models):
        [init(app, models) for init in cls]