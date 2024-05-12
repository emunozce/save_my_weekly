"""Security module.
This module contains the security functions used to verify and hash passwords.
Also contains the OAuth2PasswordBearer object used to authenticate users.
JWT tokens are used to authenticate users.
"""

from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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
