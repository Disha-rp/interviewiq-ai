from django.db import models
from resumes.models import Resume


class ResumeAnalysis(models.Model):
    resume = models.OneToOneField(
        Resume,
        on_delete=models.CASCADE,
        related_name="analysis"
    )

    score = models.IntegerField(default=0)

    skills = models.JSONField(default=list)

    education = models.TextField(blank=True)

    experience = models.TextField(blank=True)

    missing_skills = models.JSONField(default=list)

    suggestions = models.JSONField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis - {self.resume.user.full_name}"