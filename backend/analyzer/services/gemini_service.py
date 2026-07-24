from django.conf import settings

from google import genai

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_resume_with_gemini(resume_text):

    # -------------------------------
    # DEVELOPMENT MODE (No API calls)
    # -------------------------------
    if not settings.USE_GEMINI:
        return {
            "score": 88,
            "skills": "Python, Django, React, SQL, REST APIs",
            "education": "Bachelor of Engineering",
            "experience": "Flutter Developer Intern",
            "missing_skills": "Docker, AWS, CI/CD",
            "suggestions": "Learn Docker, AWS and build more backend projects.",
        }

    # -------------------------------
    # REAL GEMINI
    # -------------------------------
    prompt = f"""
You are an expert technical recruiter.

Analyze the following resume.

Return ONLY JSON.

Example:

{{
"score":85,
"skills":"Python, Django",
"education":"Bachelor of Engineering",
"experience":"2 years",
"missing_skills":"Docker, AWS",
"suggestions":"Improve React skills"
}}

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    import json

    return json.loads(response.text)