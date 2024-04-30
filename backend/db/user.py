"""Table USer setup file."""

from sqlmodel import SQLModel, Session
from db.models import User
from db.database import engine


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
