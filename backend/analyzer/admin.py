from django.contrib import admin
from .models import ResumeAnalysis


@admin.register(ResumeAnalysis)
class ResumeAnalysisAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "resume",
        "score",
        "created_at",
    )

    readonly_fields = (
        "score",
        "skills",
        "education",
        "experience",
        "missing_skills",
        "suggestions",
        "created_at",
    )