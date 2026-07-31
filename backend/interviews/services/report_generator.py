import json

from django.conf import settings
from google import genai

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def generate_interview_report(questions):

    # Mock mode
    if not settings.USE_GEMINI:
        return {
            "strengths": [
                "Python",
                "Django",
                "REST APIs"
            ],
            "weaknesses": [
                "Docker",
                "AWS"
            ],
            "recommendations": [
                "Practice Docker",
                "Improve behavioral interview answers"
            ],
            "overall_evaluation":
                "Strong candidate for a Python Backend Developer role."
        }

    interview_data = ""

    for question in questions:
        interview_data += f"""
Question:
{question.question}

Answer:
{question.answer}

Score:
{question.score}/10

"""

    prompt = f"""
You are an expert technical interviewer.

Analyze the interview.

Return ONLY valid JSON.

Format:

{{
    "strengths": [
        "...",
        "...",
        "..."
    ],
    "weaknesses": [
        "...",
        "...",
        "..."
    ],
    "recommendations": [
        "...",
        "...",
        "..."
    ],
    "overall_evaluation": "..."
}}

Interview:

{interview_data}
"""

    try:
        response = client.models.generate_content(
            model="gemini-flash-lite-latest",
            contents=prompt,
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception:
        return {
            "strengths": [],
            "weaknesses": [],
            "recommendations": [],
            "overall_evaluation": "Unable to generate interview report at this time."
        }