# serializers.py
from rest_framework import serializers
from .models import User


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "lastname", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }  # Ensures password is write-only
