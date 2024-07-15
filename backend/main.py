"""FastAPI application entry point."""

import base64
from datetime import datetime, timedelta
import os
from typing import Annotated
import urllib.parse

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from jwt import InvalidTokenError
import requests as req
from db.models import SpotifyToken, User, UserBase, UserSignUpRequest, Token
from db.user import insert_user, get_user_by_email
from security.security import (
    create_access_token,
    get_password_hash,
    authenticate_user,
    get_current_user,
    validate_token,
    oauth2_scheme,
    credentials_exception,
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


@app.get("/api/users/me/", tags=["User Operations"], summary="Read users data")
async def read_users_me(
    current_user: Annotated[UserBase, Depends(get_current_user)],
) -> UserBase:
    """Return the current user."""
    return current_user


@app.get(
    "/api/spotify/user/auth",
    tags=["Spotify Operations"],
    summary="Get Spotify user auth url",
)
async def read_spotify_url(
    token: Annotated[str, Depends(oauth2_scheme)]
) -> JSONResponse:
    """Redirect to url to get the auth token."""
    try:
        _ = validate_token(token)
    except InvalidTokenError as exc:
        raise credentials_exception from exc

    scopes = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-top-read"

    query_params = {
        "client_id": os.getenv("CLIENT_ID"),
        "response_type": "code",
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "scope": scopes,
        "show_dialog": "true",
    }

    url = f"{os.getenv("SPOTIFY_AUTH_URL")}?{urllib.parse.urlencode(query_params)}"

    return JSONResponse(status_code=status.HTTP_200_OK, content={"url": url})


@app.get(
    "/api/spotify/token",
    tags=["Spotify Operations"],
    summary="Get Spotify auth token",
    description="Receive the code to get the Spotify auth token.",
    dependencies=[Depends(oauth2_scheme)],
)
async def get_spotify_auth_token(token: Annotated[str, Depends(oauth2_scheme)],code: str) -> SpotifyToken:
    """Get Spotify auth token."""
    try:
        _ = validate_token(token)
    except InvalidTokenError as exc:
        raise credentials_exception from exc

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": os.getenv("REDIRECT_URI"),
    }

    auth_string = f"{os.getenv('CLIENT_ID')}:{os.getenv('CLIENT_SECRET')}"
    auth_base64 = base64.b64encode(auth_string.encode()).decode()

    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {auth_base64}",
    }

    print(headers)

    response = req.post(os.getenv("SPOTIFY_TOKEN_URL"), data=data, headers=headers, timeout=10)

    print(response.json())
    return SpotifyToken(
        access_token=response.json().get("access_token"),
        token_type=response.json().get("token_type"),
        refresh_token=response.json().get("refresh_token"),
        expires_in=response.json().get("expires_in"),
        scope=response.json().get("scope"),
    )
