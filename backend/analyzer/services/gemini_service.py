from django.conf import settings

import google.genai as genai
from google.genai.errors import (
    APIError,
    ClientError,
    ServerError,
    UnknownApiResponseError,
)


def _get_gemini_client():
    return genai.Client(api_key=settings.GEMINI_API_KEY)


def _extract_text_response(response):
    if hasattr(response, "text") and response.text:
        return response.text

    output = []

    if hasattr(response, "output") and response.output is not None:
        for item in response.output:
            if hasattr(item, "text") and item.text:
                output.append(item.text)
            elif hasattr(item, "content") and item.content:
                output.append(str(item.content))

    text_result = "\n".join(output).strip()

    return text_result or str(response)


def _generate_content(prompt):
    client = _get_gemini_client()

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt,
    )

    return _extract_text_response(response)


def analyze_resume(resume_text):
    if not settings.GEMINI_API_KEY:
        return "Gemini API key is not configured."

    prompt = (
        "Summarize this resume in 5 concise bullet points.\n\n"
        "Resume:\n"
        f"{resume_text}"
    )

    try:
        return _generate_content(prompt)

    except (APIError, ClientError, ServerError, UnknownApiResponseError) as exc:
        return f"Gemini API error: {exc}"

    except Exception as exc:
        return f"Gemini integration error: {exc}"


def generate_interview_questions_with_gemini(
    resume_text,
    job_role,
    difficulty,
):
    if not settings.GEMINI_API_KEY:
        return "Gemini API key is not configured."

    prompt = f"""
You are an expert technical interviewer.

Based on the candidate's resume, generate exactly 10 interview questions.

Candidate Resume:
{resume_text}

Job Role:
{job_role}

Difficulty Level:
{difficulty}

Instructions:
- Generate exactly 10 questions.
- Start with one HR question.
- Include technical questions related to the resume.
- Include role-specific questions.
- End with one behavioral question.
- Return ONLY the questions.
- Number them from 1 to 10.
"""

    try:
        return _generate_content(prompt)

    except (APIError, ClientError, ServerError, UnknownApiResponseError) as exc:
        return f"Gemini API error: {exc}"

    except Exception as exc:
        return f"Gemini integration error: {exc}"