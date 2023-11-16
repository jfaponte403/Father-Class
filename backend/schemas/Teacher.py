from pydantic import BaseModel


class Teacher(BaseModel):
    name: str
    code: str
    email: str
