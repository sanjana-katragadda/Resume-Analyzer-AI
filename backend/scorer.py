def calculate_score(text, skills):

    text = text.lower()

    breakdown = {
        "contact": 0,
        "skills": 0,
        "education": 0,
        "projects": 0,
        "experience": 0
    }

    if "@" in text:
        breakdown["contact"] = 20

    if len(skills) >= 5:
        breakdown["skills"] = 20
    elif len(skills) >= 3:
        breakdown["skills"] = 15
    elif len(skills) >= 1:
        breakdown["skills"] = 10

    if "education" in text:
        breakdown["education"] = 20

    if "project" in text:
        breakdown["projects"] = 20

    if "experience" in text:
        breakdown["experience"] = 20

    score = sum(breakdown.values())

    return {
        "score": score,
        "breakdown": breakdown
    }