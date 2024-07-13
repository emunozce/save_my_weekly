"""SQLModel classes for the database tables."""

from datetime import datetime
from pydantic import BaseModel
from sqlmodel import Field, SQLModel
from db.database_configs import engine


############################## User Models ##########################################


class UserBase(SQLModel):
    """Base User model."""

    name: str
    lastname: str


class User(UserBase, table=True):
    """Users table model."""

    email: str | None = Field(default=None, primary_key=True)
    hashed_password: str = Field(nullable=False)
    date_created: datetime = Field(nullable=False)


class UserSignUpRequest(UserBase):
    """User model. Used to create a user."""

    email: str
    password: str


class UserLoginRequest(BaseModel):
    """User model. Used to login a user."""

    email: str
    password: str


class UserLoginResponse(UserBase):
    """User model. Used to login a user."""

    auth_token: str | None = None


########################################################################


############################## Token Models ##########################################


class TokenData(BaseModel):
    """Token model."""

    username: str | None = None


##########################################################################


def create_db_and_tables():
    """Create database and tables."""
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db_and_tables()
