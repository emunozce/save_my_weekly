"""Table USer setup file."""

from sqlmodel import Session
from db.models import User
from db.database_configs import engine


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
