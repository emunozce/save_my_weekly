"""Table USer setup file."""

from sqlmodel import Session
from app.data.models import User
from app.data.database_configs import engine


async def insert_user(user: User) -> None:
    """
    This function inserts a user object into the database using an asynchronous approach in Python.

    :param user: User object that represents a user to be inserted into the database
    :type user: User
    """
    with Session(engine) as session:
        session.add(user)
        session.commit()


async def get_user_by_email(email: str) -> User | None:
    """
    This asynchronous Python function retrieves a user by their email from a database session.

    :param email: The `get_user_by_email` function is designed to retrieve a user from the database
    based on their email address. The function takes an email address as a parameter and returns the
    corresponding `User` object if found, or `None` if no user with that email address exists in the
    database
    :type email: str
    :return: The function `get_user_by_email` is returning a `User` object or `None`
    if no user is found with the specified email.
    """
    with Session(engine) as session:
        user = session.get(User, email)
    return user
