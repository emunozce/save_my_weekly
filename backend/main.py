"""FastAPI application entry point."""

from datetime import datetime
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from db.models import User, UserLoginRequest, UserSignUpRequest, UserBase
from db.user import insert_user, get_user_by_email
from security.security import get_password_hash, verify_password

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/login", status_code=status.HTTP_200_OK, tags=["User operations"])
async def login(user_request: UserLoginRequest) -> UserBase:
    """Login route."""
    user = await get_user_by_email(user_request.email)

    if not user:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "User not found. Try to sign up instead"},
        )

    if not verify_password(user_request.password, user.hashed_password):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"message": "Invalid email / password."},
        )

    return UserBase(name=user.name, lastname=user.lastname)


@app.post("/api/signup", status_code=status.HTTP_201_CREATED, tags=["User operations"])
async def signup(user: UserSignUpRequest) -> JSONResponse:
    """Sign up a user."""

    if get_user_by_email(user.email) is None:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Email already in use, try to log in instead."},
        )
    else:
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
