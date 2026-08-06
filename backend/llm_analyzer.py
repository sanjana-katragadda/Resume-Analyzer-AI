import os
import json
from dotenv import load_dotenv
from openai import OpenAI


# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()


# ==========================================
# GET OPENROUTER API KEY
# ==========================================

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not OPENROUTER_API_KEY:
    raise ValueError(
        "OPENROUTER_API_KEY is not set in .env"
    )


# ==========================================
# CREATE OPENROUTER CLIENT
# ==========================================

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)


# ==========================================
# AI RESUME ANALYSIS FUNCTION
# ==========================================

def analyze_resume_with_llm(
    resume_text,
    job_description,
    skills,
    certifications,
    job_match,
    semantic_score
):

    prompt = f"""
You are an AI Resume Analyzer and Recruitment Assistant.

Analyze the candidate's resume against the provided job description.
IMPORTANT RULES:

1. Use ONLY the extracted resume skills provided.
2. Use ONLY the extracted certifications provided.
3. Use the JOB MATCH RESULT as the source of truth for matching and missing skills.
4. Do NOT assume or invent skills, certifications, projects, or experience.
5. The "missing_or_weak_areas" should be based on the missing_skills in the JOB MATCH RESULT.
6. Explain why the candidate matches the job based only on the given data.
7. If there are no certifications, clearly mention that no relevant certifications were found.
ADDITIONAL INSTRUCTIONS:

- candidate_summary should summarize the candidate using only the resume information.

- key_strengths should come only from the extracted skills, certifications, education, and projects.

- missing_or_weak_areas should ONLY use the missing_skills from the JOB MATCH RESULT.

- job_fit_analysis should explain the overall suitability of the candidate.

- fit_reason should explain why this resume matches the job in 2–3 sentences.

- not_fit_reason should explain what important requirements are missing in 2–3 sentences.

- certification_analysis should explain whether the extracted certifications are relevant to the job. If there are no certifications, return "No relevant certifications found."

- security_recommendations should provide simple recommendations related to secure software development such as protecting API keys, validating user input, preventing SQL Injection, using HTTPS, password hashing, or GitHub secret management, based on the candidate's profile.

- Do not invent any information that is not present in the provided resume or extracted data.

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

EXTRACTED RESUME SKILLS:
{skills}

EXTRACTED CERTIFICATIONS:
{certifications}

JOB MATCH RESULT:
{job_match}

SEMANTIC MATCH SCORE:
{semantic_score}%

Return your analysis ONLY as valid JSON.

Do not use Markdown.
Do not use code blocks.
Do not add any text before or after the JSON.

Use exactly this structure:

{{
    "candidate_summary": "A short summary of the candidate.",

    "key_strengths": [
        "Strength 1",
        "Strength 2",
        "Strength 3"
    ],

    "missing_or_weak_areas": [
        "Weak Area 1",
        "Weak Area 2"
    ],

    "job_fit_analysis": "Overall analysis of the candidate.",

    "fit_reason": "Explain why this resume is suitable for the job in 2-3 lines.",

    "not_fit_reason": "Explain why this resume is not a perfect match in 2-3 lines.",

    "certification_analysis": "Explain whether the candidate's certifications are relevant to this job. If none are found, say 'No relevant certifications found.'",

    "security_recommendations": [
        "Recommendation 1",
        "Recommendation 2"
    ],

    "skill_improvement_recommendations": [
        "Recommendation 1",
        "Recommendation 2"
    ],

    "resume_improvement_suggestions": [
        "Suggestion 1",
        "Suggestion 2"
    ],

    "final_recommendation": "Final hiring recommendation."
}}
"""

    try:

        # ==========================================
        # SEND REQUEST TO OPENROUTER
        # ==========================================

        response = client.chat.completions.create(

            model="openrouter/free",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )


        # ==========================================
        # GET AI RESPONSE
        # ==========================================

        response_text = response.choices[0].message.content.strip()


        # ==========================================
        # REMOVE MARKDOWN CODE FENCES
        # IF MODEL RETURNS THEM
        # ==========================================

        if response_text.startswith("```json"):

            response_text = response_text[7:]

        elif response_text.startswith("```"):

            response_text = response_text[3:]


        if response_text.endswith("```"):

            response_text = response_text[:-3]


        response_text = response_text.strip()


        # ==========================================
        # CONVERT RESPONSE TO JSON
        # ==========================================

        ai_analysis = json.loads(
            response_text
        )

        return ai_analysis


    # ==========================================
    # HANDLE INVALID JSON
    # ==========================================

    except json.JSONDecodeError:

        return {
    "candidate_summary": "AI analysis was generated but could not be converted into structured JSON.",

    "key_strengths": [],

    "missing_or_weak_areas": [],

    "job_fit_analysis": response_text,

    "fit_reason": "",

    "not_fit_reason": "",

    "certification_analysis": "",

    "security_recommendations": [],

    "skill_improvement_recommendations": [],

    "resume_improvement_suggestions": [],

    "final_recommendation": "Please review the generated AI analysis manually."
}

    # ==========================================
    # HANDLE API ERRORS
    # ==========================================

    except Exception as e:

        return {

            "candidate_summary":
                "AI analysis could not be generated.",

            "key_strengths":
                [],

            "missing_or_weak_areas":
                [],

            "job_fit_analysis":
                f"LLM API Error: {str(e)}",

            "skill_improvement_recommendations":
                [],

            "resume_improvement_suggestions":
                [],

            "final_recommendation":
                "Please try again later."

        }


# ==========================================
# TEST THE LLM
# ==========================================

if __name__ == "__main__":

    test_result = analyze_resume_with_llm(

        resume_text=(
            "Python developer with experience "
            "in FastAPI, SQL and Machine Learning."
        ),

        job_description=(
            "Looking for a Python developer "
            "with FastAPI, SQL, Machine Learning "
            "and Docker."
        ),

        skills=[
            "python",
            "fastapi",
            "sql",
            "machine learning"
        ],

        job_match={

            "match_score": 80,

            "matching_skills": [
                "python",
                "fastapi",
                "sql",
                "machine learning"
            ],

            "missing_skills": [
                "docker"
            ]
        },

        semantic_score=75
    )


    print(
        "\n========== OPENROUTER JSON OUTPUT ==========\n"
    )


    print(
        json.dumps(
            test_result,
            indent=4
        )
    )