from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from resumes.models import Resume
from .services.answer_evaluator import evaluate_answer
from django.db.models import Avg
from rest_framework.views import APIView
from rest_framework.response import Response
from .services.report_generator import generate_interview_report

from .models import Interview, InterviewQuestion
from .serializers import (
    InterviewSerializer,
    InterviewQuestionSerializer,
    SubmitAnswerSerializer,
    InterviewReportSerializer,
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

class InterviewReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, interview_id):

        interview = Interview.objects.get(
            id=interview_id,
            user=request.user
        )

        questions = InterviewQuestion.objects.filter(
            interview=interview
        )

        total_questions = questions.count()

        questions_answered = questions.exclude(
            answer__isnull=True
        ).exclude(
            answer=""
        ).count()

        questions_remaining = total_questions - questions_answered

        answered_questions = questions.exclude(
            answer__isnull=True
        ).exclude(
            answer=""
        )

        average_score = (
            answered_questions.aggregate(avg=Avg("score"))["avg"] or 0
        )

        overall_score = average_score * 10

        completion_percentage = (
            (questions_answered / total_questions) * 100
            if total_questions > 0 else 0
        )

        status = (
            "Completed"
            if questions_answered == total_questions
            else "Interview In Progress"
        )

        data = {
            "overall_score": round(overall_score, 2),
            "average_score": round(average_score, 2),
            "total_questions": total_questions,
            "questions_answered": questions_answered,
            "questions_remaining": questions_remaining,
            "completion_percentage": round(completion_percentage, 2),
            "status": status,
        }

        # Generate AI Interview Summary
        ai_report = generate_interview_report(answered_questions)

        # Merge AI response into statistics
        data.update(ai_report)

        return Response(data)