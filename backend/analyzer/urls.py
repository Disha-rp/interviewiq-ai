from django.urls import path
from .views import ResumeAnalysisView

urlpatterns = [
    path(
        "resume-analysis/",
        ResumeAnalysisView.as_view(),
        name="resume-analysis",
    ),
]
