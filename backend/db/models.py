"""SQLModel classes for the database tables."""

from datetime import datetime
from sqlmodel import Field, SQLModel
from db.database_configs import engine


class UserBase(SQLModel):
    """Base User model."""

    name: str
    lastname: str


class User(UserBase, table=True):
    """Users table model."""

    email: str | None = Field(default=None, primary_key=True)
    hashed_password: str = Field(nullable=False)
    date_created: datetime = Field(nullable=False)


class UserCreate(UserBase):
    """User model. Used to create a user."""

    email: str
    password: str


class UserResponse(UserBase):
    """User model. Used to return a user."""

    email: str


def create_db_and_tables():
    """Create database and tables."""
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db_and_tables()
