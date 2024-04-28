"""Table USer setup file."""

from datetime import date
from sqlmodel import Field, SQLModel, Session
from db.database_setup import engine


class User(SQLModel, table=True):
    """Users table model."""

    name: str
    lastname: str = Field(default=None)
    email: str | None = Field(default=None, primary_key=True)
    password: str
    salt: str
    date_created: date


def create_db_and_tables():
    """Create database and tables."""
    SQLModel.metadata.create_all(engine)


def insert_user(user: User):
    """Insert a user."""
    with Session(engine) as session:
        session.add(user)
        session.commit()


def get_user_by_email(email: str):
    """Get a user by email."""
    with Session(engine) as session:
        user = session.get(User, email)
    return user


if __name__ == "__main__":
    create_db_and_tables()
