"""Security module.
This module contains the security functions used to verify and hash passwords.
Also contains the OAuth2PasswordBearer object used to authenticate users.
JWT tokens are used to authenticate users.
"""

from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    """Verify a password.
    Return True if the password is correct, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    """Hash a password.
    Return the hashed password.
    """
    return pwd_context.hash(password)
