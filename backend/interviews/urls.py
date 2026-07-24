from django.urls import path

from .views import (
    InterviewCreateView,
    InterviewQuestionListView,
    SubmitAnswerView,
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
]