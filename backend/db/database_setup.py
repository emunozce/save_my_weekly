from sqlmodel import create_engine

SQLITE_URL = "sqlite:///db/database.db"

engine = create_engine(SQLITE_URL, echo=True)
