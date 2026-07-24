from google import genai
from django.conf import settings
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def evaluate_answer(question, answer):

    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
{question}

Candidate Answer:
{answer}

Return ONLY valid JSON.

Example:

{{
    "score": 8,
    "feedback": "Good explanation. Mention more real-world examples."
}}
"""

    models = [
        "gemini-2.0-flash",
        "gemini-2.5-flash-lite",
        "gemini-flash-lite-latest",
    ]

    for model in models:
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt,
            )

            return json.loads(response.text)

        except Exception:
            continue

    # Fallback if all Gemini models fail
    return {
        "score": 8,
        "feedback": (
            "AI evaluation is temporarily unavailable. "
            "This is a mock evaluation."
        ),
    }