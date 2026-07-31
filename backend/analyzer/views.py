from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from resumes.models import Resume
from analyzer.services.gemini_service import analyze_resume


class ResumeAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        resume = (
            Resume.objects.filter(user=request.user)
            .order_by("-uploaded_at")
            .first()
        )

        if not resume:
            return Response(
                {"error": "No resume found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        analysis_text = analyze_resume(resume.extracted_text)

        if analysis_text.startswith("Gemini API error:"):
            return Response(
                {"error": analysis_text},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response(
            {"analysis": analysis_text},
            status=status.HTTP_200_OK,
        )