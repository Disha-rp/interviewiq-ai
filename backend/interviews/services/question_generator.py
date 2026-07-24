def generate_interview_questions(job_role, difficulty):
    """
    Temporary mock question generator.
    Later this will use Gemini.
    """

    return [
        "Tell me about yourself.",
        f"What are the responsibilities of a {job_role}?",
        "Explain Object-Oriented Programming.",
        "What is REST API?",
        "What is JWT Authentication?",
        "Explain the difference between GET and POST.",
        "What is SQL JOIN?",
        "What is Git and why is it used?",
        f"What projects have you built related to {job_role}?",
        f"Why should we hire you for this {difficulty} level role?"
    ]