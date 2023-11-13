from pydantic import BaseModel


class Student(BaseModel):
    name: str
    code: str
    age: str
    course: str
