from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import ResumeAnalysis
from .serializers import ResumeAnalysisSerializer


class ResumeAnalysisView(generics.RetrieveAPIView):
    serializer_class = ResumeAnalysisSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        resume_id = self.kwargs["resume_id"]

        return ResumeAnalysis.objects.get(
            resume__id=resume_id,
            resume__user=self.request.user
        )