from sqlalchemy import create_engine, MetaData

engine = create_engine('mysql+pymysql://root:@localhost:3307/father_class')

meta = MetaData()

conn = engine.connect()
d