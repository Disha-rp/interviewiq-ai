import re


COMMON_SKILLS = [
    "Python",
    "Django",
    "React",
    "Java",
    "C++",
    "JavaScript",
    "SQL",
    "MySQL",
    "HTML",
    "CSS",
    "Git",
    "Docker",
    "AWS",
    "Flutter",
    "Firebase",
    "REST API",
    "Machine Learning",
    "TensorFlow",
    "PyTorch",
]


def analyze_resume(text):
    detected_skills = []

    for skill in COMMON_SKILLS:
        if re.search(rf"\b{re.escape(skill)}\b", text, re.IGNORECASE):
            detected_skills.append(skill)

    score = min(len(detected_skills) * 5, 100)

    missing_skills = [
        skill for skill in ["Docker", "AWS", "Git"] if skill not in detected_skills
    ]

    suggestions = []

    if score < 60:
        suggestions.append("Add more technical skills.")

    if "Projects" not in text:
        suggestions.append("Add a Projects section.")

    if "Experience" not in text:
        suggestions.append("Mention internship or work experience.")

    return {
        "score": score,
        "skills": detected_skills,
        "education": "",
        "experience": "",
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }