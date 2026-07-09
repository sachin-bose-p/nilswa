import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

# Uses a docker-compose local postgres instance by default
# On Vercel, it automatically injects POSTGRES_URL_NON_POOLING for Neon databases
DATABASE_URL = os.getenv("POSTGRES_URL_NON_POOLING") or os.getenv("DATABASE_URL", "postgresql://nilswa:nilswapassword@localhost:5432/nilswadb")

# Use NullPool for Serverless Environments (Vercel) to prevent connection exhaustion
engine = create_engine(DATABASE_URL, poolclass=NullPool)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
