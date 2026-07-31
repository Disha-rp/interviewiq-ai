from analyzer.services.gemini_service import (
    generate_interview_questions_with_gemini,
)


def generate_interview_questions(resume_text, job_role, difficulty):
    """
    Generate interview questions using Gemini AI.
    """

    response = generate_interview_questions_with_gemini(
        resume_text,
        job_role,
        difficulty,
    )
    if response.startswith("Gemini API error:") or response.startswith("Gemini integration error:"):
        raise Exception(response)

    # Convert numbered output into a Python list
    questions = []

    for line in response.split("\n"):
        line = line.strip()

        if not line:
            continue

        # Remove numbering like "1. "
        if line[0].isdigit():
            parts = line.split(".", 1)
            if len(parts) > 1:
                line = parts[1].strip()

        questions.append(line)

    return questions