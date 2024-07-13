"""FastAPI application entry point."""

from datetime import datetime, timedelta
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from db.models import (
    User,
    UserLoginResponse,
    UserSignUpRequest,
)
from db.user import insert_user, get_user_by_email
from security.security import (
    authenticate_user,
    create_access_token,
    get_password_hash,
)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post(
    "/api/login",
    status_code=status.HTTP_200_OK,
    tags=["User Operations"],
    summary="Login a user",
    description="Receive email, password to login a user. Returns a JWT token.",
)
async def login(
    user_request: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> UserLoginResponse:
    """Login route."""
    user = await authenticate_user(user_request.username, user_request.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )
    access_token_expires = timedelta(minutes=1440)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires,
    )

    return UserLoginResponse(
        name=user.name, lastname=user.lastname, auth_token=access_token
    )


@app.post(
    "/api/signup",
    status_code=status.HTTP_201_CREATED,
    tags=["User Operations"],
    summary="Sign up a user",
    description="Receive email, password, name and lastname to create a new user.",
)
async def signup(user: UserSignUpRequest) -> JSONResponse:
    """Sign up a user."""

    if get_user_by_email(user.email) is None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User already exists."
        )

    hashed_password = get_password_hash(user.password)

    user: User = User(
        email=user.email,
        hashed_password=hashed_password,
        name=user.name,
        lastname=user.lastname,
        date_created=datetime.now(),
    )

    await insert_user(user)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED, content={"message": "User created."}
    )
