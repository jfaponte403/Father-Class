from fastapi import APIRouter, HTTPException

from config.db import conn
from models.teachers import teachers
from schemas.Teacher import Teacher

teacher = APIRouter()


@teacher.get('/teacher')
def get_teachers():
    result = conn.execute(teachers.select())
    rows = result.fetchall()

    for row in rows:
        print(row)

    data = [dict(row._asdict()) for row in rows]
    return data


@teacher.post('/teacher', status_code=200)
def create_students(teacher_request: Teacher):
    try:
        print(teacher_request)

        new_teacher = {
            'code': teacher_request.code,
            'name': teacher_request.name,
            'email': teacher_request.email
        }

        print("New Student:", new_teacher)

        result = conn.execute(teachers.insert().values(new_teacher))

        # Commit the transaction
        conn.commit()

        print("Result:", result)
        return {"message": "Teacher created successfully"}
    except Exception as e:

        print("Exception:", e)
        conn.rollback()
        # Optionally, you can rollback the transaction on exception
        return HTTPException(status_code=500, detail="Error occurred")


@teacher.delete('/teacher/{code}', status_code=200)
def delete_student(code: str):
    try:
        result = conn.execute(teachers.delete().where(teachers.c.code == code))

        # Commit the transaction
        conn.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Student not found")

        return {"message": "Student deleted successfully"}
    except Exception as e:
        print("Exception:", e)
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occurred")


@teacher.put('/teacher/{code}', status_code=200)
def update_student(code: str, teacher_request: Teacher):
    try:
        update_values = {
            'code': teacher_request.code,
            'name': teacher_request.name,
            'email': teacher_request.email
        }

        result = conn.execute(teachers.update().where(teachers.c.code == code).values(update_values))

        # Commit the transaction
        conn.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Student not found")

        return {"message": "Student updated successfully"}
    except Exception as e:
        print("Exception:", e)
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occurred")
