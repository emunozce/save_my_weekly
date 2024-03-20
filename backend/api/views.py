# Create your views here.
import json
import secrets
import hashlib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import User

from .serializers import SignUpSerializer


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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _encrypt(self, password):
        salt = secrets.token_hex(16)
        iterations = 100000
        dklen = 32
        hashed_password = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), salt.encode(), iterations, dklen
        ).hex()
        return [hashed_password, salt]
