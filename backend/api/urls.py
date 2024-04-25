# urls.py
from django.urls import path
from .views import SignUp, LogIn, User_auth_spotify


urlpatterns = [
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", LogIn.as_view(), name="login"),
    path("user_auth_spotify/", User_auth_spotify.as_view(), name="user_auth_spotify"),
]
