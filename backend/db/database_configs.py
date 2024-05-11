""" This file is used to create the database engine needed by SQLModel """

import os
from dotenv import load_dotenv
from sqlmodel import create_engine

load_dotenv()

engine = create_engine(os.getenv("SQLITE_URL"))
