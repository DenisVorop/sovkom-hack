from fastapi import FastAPI

from routes import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() # docs_url=None, redoc_url=None, openapi_url=None) app.openapi = None

allow_origins=["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
