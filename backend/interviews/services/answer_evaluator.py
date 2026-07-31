from google import genai
from django.conf import settings
import json
import logging

logger = logging.getLogger(__name__)
client = genai.Client(api_key=settings.GEMINI_API_KEY)


def evaluate_answer(question, answer):

    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer out of 10.

Return ONLY valid JSON in this format:

{{
    "score": 8,
    "feedback": "Good answer.",
    "ai_feedback": "The explanation is correct. Mention wrapper functions, @ syntax, and a practical example to make your answer stronger."
}}
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
        logger.exception("Gemini evaluation failed")

        return {
            "score": 0,
            "feedback": "AI evaluation is temporarily unavailable.",
            "ai_feedback": "Unable to generate detailed feedback at this time.",
        }