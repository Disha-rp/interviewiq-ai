from rest_framework import serializers
from .models import Interview, InterviewQuestion


class InterviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Interview
        fields = [
            "id",
            "resume",
            "job_role",
            "difficulty",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "status",
            "created_at",
        ]

class InterviewQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = InterviewQuestion
        fields = [
            "id",
            "question",
            "answer",
            "score",
        ]

class SubmitAnswerSerializer(serializers.Serializer):
    answer = serializers.CharField()

class InterviewReportSerializer(serializers.Serializer):
    overall_score = serializers.FloatField()
    average_score = serializers.FloatField()

    total_questions = serializers.IntegerField()
    questions_answered = serializers.IntegerField()
    questions_remaining = serializers.IntegerField()

    completion_percentage = serializers.FloatField()

    status = serializers.CharField()