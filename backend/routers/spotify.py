"""Spotify router."""

import base64
from datetime import datetime, timedelta
import json
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

@router.get(
    "/top/artists",
    summary="Get Spotify top artists",
    description="Receive the Spotify auth token to get the top artists.",
)
async def get_spotify_top_artists(
    token: Annotated[str, Depends(oauth2_scheme)],
    spotify_token: str,
    timespan: str) -> JSONResponse:
    """Get Spotify top artists."""
    try:
        _ = validate_token(token)
    except InvalidTokenError as exc:
        raise credentials_exception from exc

    headers = {
        "Authorization": f"Bearer {spotify_token}",
    }

    response = req.get(f"{os.getenv("API_BASE_URL")}me/top/artists?time_range={timespan}&limit=20",
                headers=headers,
                timeout=10)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=response.json()
    )

@router.get(
    "/save/weekly-playlist",
    summary="Save Spotify weekly playlist",
    description="Receive the Spotify auth token to save the weekly playlist."
)
async def save_spotify_weekly_playlist(
    token: Annotated[str, Depends(oauth2_scheme)],
    spotify_token: str) -> JSONResponse:
    """Save Spotify weekly playlist."""
    try:
        _ = validate_token(token)
    except InvalidTokenError as exc:
        raise credentials_exception from exc

    headers = {
        "Authorization": f"Bearer {spotify_token}",
    }

    response = req.get(f"{os.getenv("API_BASE_URL")}me",
                headers=headers,
                timeout=10)

    user_id = response.json().get("id")

    response = req.get(f"{os.getenv("API_BASE_URL")}users/{user_id}/playlists?limit=50",
                headers=headers,
                timeout=10)

    playlists_data = response.json().get("items")

    playlist_id:list = [playlist.get("id") for playlist in playlists_data if playlist.get("name") == "Discover Weekly"]

    response = req.get(f"{os.getenv("API_BASE_URL")}playlists/{playlist_id[0]}/tracks",
                headers=headers,
                timeout=10)

    tracks_data = response.json().get("items")

    # Get the current date
    today = datetime.today()

    # Find the current day of the week (0=Monday, 6=Sunday)
    current_day_of_week = today.weekday()

    # Calculate the date of the Monday of the current week
    monday = today - timedelta(days=current_day_of_week)

    # Calculate the date of the Sunday of the current week
    sunday = monday + timedelta(days=6)

    name = f"Discover Weekly - {monday.strftime('%Y-%m-%d')} to {sunday.strftime('%Y-%m-%d')}"
    public = True
    collaborative = False
    description = "Weekly playlist generated by Save My Weekly. Enjoy!"

    response =  req.post(f"{os.getenv("API_BASE_URL")}users/{user_id}/playlists",
                headers=headers,
                json={"name": name, "public": public, "collaborative": collaborative, "description": description},
                timeout=10)

    new_playlist_id = response.json().get("id")

    response =  req.post(f"{os.getenv("API_BASE_URL")}playlists/{new_playlist_id}/tracks",
                headers=headers,
                json={"uris": [track.get("track").get("uri") for track in tracks_data]},
                timeout=10)

    print(response.json())


    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Weekly playlist saved."}
    )
