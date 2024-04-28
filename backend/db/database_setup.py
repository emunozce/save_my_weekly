""" This file is used to create the database engine needed by SQLModel """

from sqlmodel import create_engine

SQLITE_URL = "sqlite:///db/database.db"

engine = create_engine(SQLITE_URL, echo=True)
