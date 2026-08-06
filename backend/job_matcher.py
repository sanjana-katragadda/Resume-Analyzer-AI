def extract_job_skills(job_description):

    # Convert Job Description to lowercase
    job_description = job_description.lower()

    # List of skills that our system knows
    skills_list = [

    "python",
    "java",
    "javascript",
    "react",
    "fastapi",
    "flask",
    "django",

    "sql",
    "mysql",
    "mongodb",

    "html",
    "css",

    "git",
    "github",

    "rest api",
    "api",

    "json",

    "object oriented programming",
    "oop",

    "data structures",
    "algorithms",
    "data structures and algorithms",

    "problem solving",

    "machine learning",
    "deep learning",
    "artificial intelligence",
    "nlp",

    "pandas",
    "numpy",

    "docker",
    "aws",

    "opencv",
    "pytorch",
    "tensorflow",

    "linux",

    "unit testing",
    "pytest",

    "communication",
    "teamwork"
]
    # Store skills found in Job Description
    required_skills = []

    # Check each skill
    for skill in skills_list:

        if skill in job_description:

            required_skills.append(skill)

    return required_skills


def compare_skills(resume_skills, job_skills):

    # Convert resume skills to lowercase
    resume_skills = [
        skill.lower()
        for skill in resume_skills
    ]

    # Convert job skills to lowercase
    job_skills = [
        skill.lower()
        for skill in job_skills
    ]

    # Store matching skills
    matching_skills = []

    # Check which Job Description skills
    # are also present in the resume
    for skill in job_skills:

        if skill in resume_skills:

            matching_skills.append(skill)

    # Store missing skills
    missing_skills = []

    # Check which required skills
    # are not present in the resume
    for skill in job_skills:

        if skill not in resume_skills:

            missing_skills.append(skill)

    # Calculate Job Match Score
    if len(job_skills) > 0:

        match_score = (
            len(matching_skills)
            / len(job_skills)
        ) * 100

    else:

        match_score = 0

    # Return the result
    return {

        "matching_skills":
            matching_skills,

        "missing_skills":
            missing_skills,

        "match_score":
            round(match_score, 2)

    }