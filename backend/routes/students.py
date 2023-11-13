from fastapi import APIRouter, HTTPException
from config.db import conn
from models.students import students
from schemas.Student import Student

student = APIRouter()


@student.get('/student')
def get_students():
    result = conn.execute(students.select())
    rows = result.fetchall()

    for row in rows:
        print(row)

    data = [dict(row._asdict()) for row in rows]
    return data


@student.post('/student', status_code=200)
def create_students(student_request: Student):
    try:

        print(student_request)

        new_student = {
            'code': student_request.code,
            'name': student_request.name,
            'age': student_request.age,
            'course': student_request.course
        }

        print("New Student:", new_student)

        result = conn.execute(students.insert().values(new_student))

        # Commit the transaction
        conn.commit()

        print("Result:", result)
        return {"message": "Student created successfully"}
    except Exception as e:

        print("Exception:", e)
        conn.rollback()
        # Optionally, you can rollback the transaction on exception
        return HTTPException(status_code=500, detail="Error occurred")


@student.delete('/student/{code}', status_code=200)
def delete_student(code: str):
    try:
        result = conn.execute(students.delete().where(students.c.code == code))

        # Commit the transaction
        conn.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Student not found")

        return {"message": "Student deleted successfully"}
    except Exception as e:
        print("Exception:", e)
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occurred")


@student.put('/student/{code}', status_code=200)
def update_student(code: str, student_request: Student):
    try:
        update_values = {
            'code': student_request.code,
            'name': student_request.name,
            'age': student_request.age,
            'course': student_request.course
        }

        result = conn.execute(students.update().where(students.c.code == code).values(update_values))

        # Commit the transaction
        conn.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Student not found")

        return {"message": "Student updated successfully"}
    except Exception as e:
        print("Exception:", e)
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occurred")