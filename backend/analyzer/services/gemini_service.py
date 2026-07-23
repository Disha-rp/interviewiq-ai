import json

from google import genai
from django.conf import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_resume_with_gemini(resume_text):
    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the resume and return ONLY valid JSON.

Do not add markdown.
Do not add explanation.
Do not use triple backticks.

Return this exact JSON format:

{{
    "score": 0,
    "skills": [],
    "education": "",
    "experience": "",
    "missing_skills": [],
    "suggestions": [],
    "interview_questions": []
}}

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
    )

    return json.loads(response.text)