from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Resume
from .serializers import ResumeSerializer
from .services.pdf_extractor import extract_text_from_pdf

from analyzer.models import ResumeAnalysis
from analyzer.services.resume_analyzer import analyze_resume


class ResumeUploadView(generics.CreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        resume = serializer.save(user=self.request.user)

        extracted_text = extract_text_from_pdf(resume.resume.path)

        resume.extracted_text = extracted_text
        resume.save()

        analysis = analyze_resume(extracted_text)

        ResumeAnalysis.objects.create(
            resume=resume,
            score=analysis["score"],
            skills=analysis["skills"],
            education=analysis["education"],
            experience=analysis["experience"],
            missing_skills=analysis["missing_skills"],
            suggestions=analysis["suggestions"],
        )