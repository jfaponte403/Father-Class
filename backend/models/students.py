from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import String

from config.db import meta, engine

students = Table(
    "students",
    meta,
    Column("code", String(255), primary_key=True),
    Column("name", String(255)),
    Column("age", String(255)),
    Column("course", String(255)),
)

meta.create_all(engine)
