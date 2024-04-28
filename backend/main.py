"""FastAPI application entry point."""

from datetime import date
from fastapi import FastAPI
from db.user import User, insert_user

app = FastAPI()

user = User(
    name="John",
    lastname="Doe",
    email="emunozce80@gmail.com",
    date_created=date.today(),
    password="123456",
    salt="32432432423",
)


@app.get("/lol")
async def root():
    insert_user(user)
    return {"message": "Hello World"}
