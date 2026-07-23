from rest_framework import serializers
from .models import User


from rest_framework import serializers
from .models import User
import uuid


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "full_name",
            "email",
            "password",
            "confirm_password",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        full_name = validated_data["full_name"]

        username = (
            full_name.lower()
            .replace(" ", "_")
            + "_"
            + uuid.uuid4().hex[:6]
        )

        user = User.objects.create_user(
            username=username,
            full_name=validated_data["full_name"],
            email=validated_data["email"],
            password=validated_data["password"],
            role="candidate",
        )

        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "full_name",
            "email",
            "role",
            "created_at",
        ]