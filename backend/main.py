from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes.students import student

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student)

