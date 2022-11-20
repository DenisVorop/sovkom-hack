import aiofiles
import pickle, json, ujson, os

SAVE_DIR = os.environ.get('FILE_DUMP_DIR','dumps/'); 
PRINT_EVENTS= int(os.environ.get('DB_PRINT_EVENTS', 0))

if not os.path.exists(SAVE_DIR): os.mkdir(SAVE_DIR)

class AsyncFiles:
    async def async_read_file(self,fn, data_type='json', use_def_dir=None):
        data_type = data_type or self.data_type
        di = '' if not use_def_dir else SAVE_DIR
        if PRINT_EVENTS: print('read f '+ data_type + ' ' + fn)
        if data_type == 'bytes':
            if PRINT_EVENTS: print('load_bytes')

            async with aiofiles.open(di+fn, mode='rb') as byte_file:
                data = pickle.loads(await byte_file.read())
        else:    
            async with aiofiles.open(di+fn, mode='r') as json_file:
                data = await json_file.read()
                if data_type != 'native': data = json.loads(data)
        return data

    async def async_save_file(self,fn,v, data_type='json', use_def_dir=False):
        data_type = data_type or self.data_type
        di = '' if not use_def_dir else SAVE_DIR
        if PRINT_EVENTS: print('save f '+ data_type + ' ' + fn)
        h = 'w'
        if data_type == 'native': pass
        elif data_type == 'bytes':
            h = 'wb'
            v = pickle.dumps(v)
        elif data_type!='native': v= ujson.dumps(v, ensure_ascii=False)
        #
        async with aiofiles.open(di+fn, mode=h) as f:
            await f.write(v)



    # def save_file(self,fn,v, data_type='json', use_def_dir=False): # data_type = native bytes json
    #     data_type = data_type or self.data_type
    #     di = '' if not use_def_dir else SAVE_DIR
    #     if PRINT_EVENTS: print('save f '+ data_type + ' ' + fn)
    #     h = 'w'
    #     if data_type == 'native': pass
    #     elif data_type == 'bytes':
    #         h = 'wb'
    #         v = pickle.dumps(v)
    #     elif data_type!='native': v= ujson.dumps(v, ensure_ascii=False)
    #     # if type(v) is bytes: 
    #     #     h = 'wb'
    #     # else: v=ujson.dumps(v)
    #     file = open(di+fn, h)
    #     file.write(v)
    #     file.close()
    # def read_file(self,fn, data_type='json', use_def_dir=None):
    #     data_type = data_type or self.data_type
    #     di = '' if not use_def_dir else SAVE_DIR
    #     if PRINT_EVENTS: print('read f '+ data_type + ' ' + fn)
    #     if data_type == 'bytes':
    #         if PRINT_EVENTS: print('load_bytes')
    #         with open(di+fn,'rb') as byte_file:
    #             data = pickle.loads(byte_file.read())
    #     else:    
    #         with open(di+fn) as json_file:
    #             data = json_file.read()
    #             if data_type != 'native': data = json.loads(data)
    #     return data