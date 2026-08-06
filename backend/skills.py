from skills_db import SKILLS

def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        if skill.lower() in text:
            found_skills.append(skill)

    return found_skills
def compare_skills(resume_skills, job_skills):
    # Convert everything to lowercase
    resume_skills = [skill.lower() for skill in resume_skills]
    job_skills = [skill.lower() for skill in job_skills]

    # Find matching skills
    matching_skills = []

    for skill in job_skills:
        if skill in resume_skills:
            matching_skills.append(skill)

    # Find missing skills
    missing_skills = []

    for skill in job_skills:
        if skill not in resume_skills:
            missing_skills.append(skill)

    # Calculate match percentage
    if len(job_skills) > 0:
        match_score = (len(matching_skills) / len(job_skills)) * 100
    else:
        match_score = 0

    return {
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "match_score": round(match_score, 2)
    }