"""SQLModel classes for the database tables."""

from datetime import date
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    """Users table model."""

    name: str
    lastname: str = Field(default=None)
    email: str | None = Field(default=None, primary_key=True)
    password: str
    salt: str
    date_created: date
