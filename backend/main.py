"""FastAPI application entry point."""

from datetime import datetime
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from db.models import User, UserCreate
from db.user import insert_user
from security.security import get_password_hash

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/signup", status_code=status.HTTP_201_CREATED, response_model=str)
async def signup(user: UserCreate) -> str:
    """Sign up a user."""
    hashed_password = get_password_hash(user.password)
    user: User = User(
        email=user.email,
        hashed_password=hashed_password,
        name=user.name,
        lastname=user.lastname,
        date_created=datetime.now(),
    )
    insert_user(user)
    return "User created successfully."
