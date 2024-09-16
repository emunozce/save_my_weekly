"""Spotify router."""

import base64
import os
import urllib.parse
from typing import Annotated

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from jwt import InvalidTokenError
import requests as req
from security.security import oauth2_scheme, validate_token, credentials_exception
from data.models import SpotifyToken

router = APIRouter(
    prefix="/api/spotify",
    tags=["Spotify Operations"],
    dependencies=[Depends(oauth2_scheme)],
)


@router.get(
    "/user/auth",
    summary="Get Spotify user auth url",
    description="Redirect to url to get the auth token.",
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


@router.get(
    "/token",
    summary="Get Spotify auth token",
    description="Receive the code to get the Spotify auth token.",
)
async def get_spotify_auth_token(token: Annotated[str, Depends(oauth2_scheme)], code: str) -> SpotifyToken:
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

    response = req.post(os.getenv("SPOTIFY_TOKEN_URL"), data=data, headers=headers, timeout=10)

    return SpotifyToken(
        access_token=response.json().get("access_token"),
        token_type=response.json().get("token_type"),
        refresh_token=response.json().get("refresh_token"),
        expires_in=response.json().get("expires_in"),
        scope=response.json().get("scope"),
    )

@router.get(
    "/top/tracks",
    summary="Get Spotify top tracks",
    description="Receive the Spotify auth token to get the top tracks.",
)
async def get_spotify_top_tracks(
    token: Annotated[str, Depends(oauth2_scheme)],
    spotify_token: str,
    timespan: str) -> JSONResponse:
    print(timespan)
    """Get Spotify top tracks."""
    try:
        _ = validate_token(token)
    except InvalidTokenError as exc:
        raise credentials_exception from exc

    headers = {
        "Authorization": f"Bearer {spotify_token}",
    }

    response = req.get(f"{os.getenv("API_BASE_URL")}me/top/tracks?time_range={timespan}&limit=20",
                headers=headers,
                timeout=10)


    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=response.json()
    )
