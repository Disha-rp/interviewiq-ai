from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from resumes.models import Resume
from .services.answer_evaluator import evaluate_answer

from .models import Interview, InterviewQuestion
from .serializers import (
    InterviewSerializer,
    InterviewQuestionSerializer,
    SubmitAnswerSerializer,
)
from .services.question_generator import generate_interview_questions


class InterviewCreateView(generics.CreateAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        resume = serializer.validated_data["resume"]

        if resume.user != self.request.user:
            raise PermissionDenied(
                "You can only create interviews for your own resume."
            )

        interview = serializer.save(user=self.request.user)

        questions = generate_interview_questions(
            interview.job_role,
            interview.difficulty,
        )

        for question in questions:
            InterviewQuestion.objects.create(
                interview=interview,
                question=question,
            )

class InterviewQuestionListView(generics.ListAPIView):
    serializer_class = InterviewQuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        interview = get_object_or_404(
            Interview,
            id=self.kwargs["interview_id"],
            user=self.request.user,
        )

        return InterviewQuestion.objects.filter(
            interview=interview
        ).order_by("id")

class SubmitAnswerView(generics.GenericAPIView):
    serializer_class = SubmitAnswerSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, question_id):

        question = get_object_or_404(
            InterviewQuestion,
            id=question_id,
            interview__user=request.user,
        )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        question.answer = serializer.validated_data["answer"]

        result = evaluate_answer(
            question.question,
            question.answer,
        )

        question.score = result["score"]
        question.feedback = result["feedback"]

        question.save()

        return Response(
            {
                "message": "Answer submitted successfully.",
                "score": question.score,
                "feedback": question.feedback,
            },
            status=status.HTTP_200_OK,
        )