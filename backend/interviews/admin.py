from django.contrib import admin

from .models import Interview, InterviewQuestion


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "job_role",
        "difficulty",
        "status",
        "created_at",
    )

    list_filter = (
        "difficulty",
        "status",
    )

    search_fields = (
        "user__full_name",
        "job_role",
    )


@admin.register(InterviewQuestion)
class InterviewQuestionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "interview",
        "score",
        "created_at",
    )

    search_fields = (
        "question",
    )