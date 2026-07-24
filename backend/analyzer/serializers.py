from rest_framework import serializers
from .models import ResumeAnalysis


class ResumeAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = [
            "id",
            "score",
            "skills",
            "education",
            "experience",
            "missing_skills",
            "suggestions",
            "created_at",
        ]