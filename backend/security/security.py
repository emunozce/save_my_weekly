"""Security module.
This module contains the security functions used to verify and hash passwords.
Also contains the OAuth2PasswordBearer object used to authenticate users.
JWT tokens are used to authenticate users.
"""

import os
from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from passlib.context import CryptContext
from data.user import get_user_by_email
from data.models import TokenData, User, UserBase

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

load_dotenv()

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    The function `verify_password` verifies if a plain password matches a hashed password.

    :param plain_password: The `plain_password` parameter is the password
    entered by the user in plain text, before it is hashed for storage or comparison
    :type plain_password: str
    :param hashed_password: The `hashed_password` parameter is the password that has been previously
    hashed for security purposes. When a user creates an account or changes
    their password, the password is hashed using a cryptographic hash function.
    This hashed password is then stored in the database
    for security reasons. When a user tries to log in,
    :type hashed_password: str
    :return: a boolean value - True if the plain password matches the hashed password,
    and False if they do not match.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    The function `get_password_hash` hashes a given password and returns the hashed password.

    :param password: The `get_password_hash` function takes a password as input,
    hashes it using some password hashing mechanism
    (assuming `pwd_context` is a globally defined object), and returns the
    hashed password as a string
    :type password: str
    :return: The function `get_password_hash` is returning the hashed version of the input password
    using the `pwd_context.hash` function.
    """
    return pwd_context.hash(password)


async def authenticate_user(username: str, password: str) -> User | None:
    """
    The function `authenticate_user` authenticates a user by checking their email and password.

    :param username: The `username` parameter is a string that represents
    the email address of the user
    trying to authenticate
    :type username: str
    :param password: The `password` parameter in the `authenticate_user` function is a string that
    represents the password input provided by the user for authentication
    :type password: str
    :return: If the user is successfully authenticated, the user object is being returned.
    If the user is not found or the password verification fails, False is being returned.
    """
    user = await get_user_by_email(username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=1440)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM")
    )
    return encoded_jwt


def validate_token(token: str) -> bool:
    """
    This function validates the provided token by decoding it using JWT.

    :param token: The `token` parameter is a string representing the JWT token to be validated.
    :type token: str
    :return: The function `validate_token` returns a boolean value indicating whether the token is
    valid or not.
    """

    try:
        return jwt.decode(
            token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")]
        )
    except ExpiredSignatureError as exc:
        raise credentials_exception from exc
    except InvalidTokenError as exc:
        raise credentials_exception from exc


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> UserBase:
    """
    This function retrieves the current user based on the provided token and validates the user's
    credentials using JWT decoding.

    :param token: The `token` parameter is of type `str`
    and is annotated with `Depends(oauth2_scheme)`.
    This indicates that the `token` is expected to be a string representing an OAuth2
    token used for authentication
    :type token: Annotated[str, Depends(oauth2_scheme)]
    :return: The function `get_current_user` is returning a `UserBase` object.
    """
    try:
        payload = validate_token(token)
    except InvalidTokenError as exc:
        raise credentials_exception from exc

    username: str | None = payload.get("sub")

    if not username:
        raise credentials_exception

    token_data = TokenData(username=username)

    user: UserBase | None = await get_user_by_email(token_data.username)

    if user is None:
        raise credentials_exception
    return user
