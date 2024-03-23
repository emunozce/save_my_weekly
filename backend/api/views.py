# Create your views here.
import secrets
import hashlib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.models import User

from .serializers import LogInSerializer, SignUpSerializer


class SignUp(APIView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)

        if serializer.is_valid():
            # Hash password
            password = serializer.validated_data.get("password")

            configs = self._encrypt(password)
            # Save user
            serializer.save(password=configs[0], salt=configs[1])
            return Response(
                {"message": "User signed up successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Email already in use, try to log in instead."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def _encrypt(self, password):
        salt = secrets.token_hex(16)
        iterations = 100000
        dklen = 32
        hashed_password = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), salt.encode(), iterations, dklen
        ).hex()
        return [hashed_password, salt]


class LogIn(APIView):
    def post(self, request):

        serializer = LogInSerializer(data=request.data)

        if serializer.is_valid():
            email = request.data.get("email")
            password = request.data.get("password")

            user = User.objects.filter(email=email).first()

            if user is None:
                return Response(
                    {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )

            if self._check_password(password, user.password, user.salt):
                return Response(
                    {"name": user.name, "lastname": user.lastname},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(
            {"message": "Error ocurred. Try again later."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def _check_password(self, password, hashed_password, salt):
        iterations = 100000
        dklen = 32
        hashed_password_to_check = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), salt.encode(), iterations, dklen
        ).hex()
        return hashed_password == hashed_password_to_check
