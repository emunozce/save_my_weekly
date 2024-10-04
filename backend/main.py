"""FastAPI application entry point."""

from datetime import datetime, timedelta
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
import uvicorn
from routers import spotify
from data.models import User, UserBase, UserSignUpRequest, Token
from data.user import insert_user, get_user_by_email
from security.security import (
    create_access_token,
    get_password_hash,
    authenticate_user,
    get_current_user,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(spotify.router)


@app.post(
    "/api/login",
    status_code=status.HTTP_200_OK,
    tags=["User Operations"],
    summary="Login a user",
    description="Receive email, password to login a user. Returns a JWT token.",
)
async def login(user_request: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
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

    return Token(access_token=access_token, token_type="bearer")


@app.post(
    "/api/signup",
    status_code=status.HTTP_201_CREATED,
    tags=["User Operations"],
    summary="Sign up a user",
    description="Receive email, password, name and lastname to create a new user.",
)
async def signup(user: UserSignUpRequest) -> JSONResponse:
    """Sign up a user."""

    if await get_user_by_email(user.email):
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


@app.get("/api/users/me", tags=["User Operations"], summary="Read users data")
async def read_users_me(
    current_user: Annotated[UserBase, Depends(get_current_user)],
) -> UserBase:
    """Return the current user."""
    return current_user


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
