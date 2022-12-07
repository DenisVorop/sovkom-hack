# модули
#import models # init DB
#from services.redirect_video import RedirectVideoService 


storage={}

# интерфейсы передаваемые
def init_interfaces(app):
    class Interfaces:
        #db = lambda: storage['db']
        #RedirectVideoService = RedirectVideoService
        db = lambda: app.config['db']

        # preload db
        @staticmethod
        async def preload_settings():
            #print(db)
            #storage['db'] = db
            #print(Interfaces.db())
            pass
            #settings=await models.Settings.get_formated_settings()
            #RedirectVideoService.updateSettings(settings) ; print('settings releaded:',settings) # check settings

        # for apidaora
        # @staticmethod
        # def send_callback(id, obj):
        #     if not id in storage: storage[id]=callback
        #     else: 
        #         if isinstance(obj, dict): storage[id].update(callback)
        #         if isinstance(obj, list): storage[id].append(callback)
        # @staticmethod
        # def get_callbacks(): return storage
    return Interfaces