from django.urls import path

from .views import (
    InterviewCreateView,
    InterviewQuestionListView,
    SubmitAnswerView,
    InterviewReportView,
)

urlpatterns = [
    path(
        "",
        InterviewCreateView.as_view(),
        name="create-interview",
    ),

    path(
        "<int:interview_id>/questions/",
        InterviewQuestionListView.as_view(),
        name="interview-questions",
    ),

    path(
        "questions/<int:question_id>/answer/",
        SubmitAnswerView.as_view(),
        name="submit-answer",
    ),

    path(
        "<int:interview_id>/report/",
        InterviewReportView.as_view(),
        name="interview-report",
    ),
]