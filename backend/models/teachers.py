from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import String

from config.db import meta, engine

teachers = Table(
    "teachers",
    meta,
    Column("code", String(255), primary_key=True),
    Column("name", String(255)),
    Column("email", String(255))
)

meta.create_all(engine)
