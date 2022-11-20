
from db.asyncf.db_postgres import AsyncPostgressDb as X;
from db.asyncf.save_file import AsyncFiles as Y;
from db.asyncf.cache import Cached as Z;



class DB (X, Y, Z): pass