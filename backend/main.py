import os
import shutil
from parser import extract_text

from certifications import extract_certifications
from contact import extract_contact_info
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from job_matcher import compare_skills, extract_job_skills
from llm_analyzer import analyze_resume_with_llm
from nlp import process_text
from scorer import calculate_score
from semantic_matcher import calculate_semantic_similarity
from skills import extract_skills
from suggestions import generate_suggestions

# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI()


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# UPLOAD FOLDER
# ==========================================

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


# ==========================================
# HOME ROUTE
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Welcome to Resume Analyzer API"
    }


# ==========================================
# UPLOAD MULTIPLE RESUMES
# ==========================================

@app.post("/upload")
def upload_resume(

    # Multiple resumes
    files: list[UploadFile] = File(...),

    # Job Description
    job_description: str = Form(...)

):

    # ==========================================
    # CHECK JOB DESCRIPTION
    # ==========================================

    if not job_description.strip():

        raise HTTPException(
            status_code=400,
            detail="Please provide a Job Description."
        )


    print("========== JOB DESCRIPTION ==========")

    print(job_description)

    print("=====================================")


    # ==========================================
    # EXTRACT REQUIRED SKILLS FROM JOB DESCRIPTION
    # ==========================================

    job_skills = extract_job_skills(
        job_description
    )


    print("JOB REQUIRED SKILLS:")

    print(job_skills)


    # ==========================================
    # CHECK IF SKILLS WERE FOUND
    # ==========================================

    if not job_skills:

        print(
            "WARNING: No known skills found in Job Description."
        )


    # ==========================================
    # CREATE EMPTY LIST
    # TO STORE ALL RESUME RESULTS
    # ==========================================

    results = []


    # ==========================================
    # PROCESS EACH RESUME ONE BY ONE
    # ==========================================

    for file in files:

        print("=====================================")

        print(
            "PROCESSING RESUME:",
            file.filename
        )

        print("=====================================")


        # ==========================================
        # CHECK FILE NAME
        # ==========================================

        if not file.filename:

            raise HTTPException(
                status_code=400,
                detail="No file selected."
            )


        # ==========================================
        # ALLOWED FILE TYPES
        # ==========================================

        allowed_extensions = [
            ".pdf",
            ".docx"
        ]


        extension = os.path.splitext(
            file.filename
        )[1].lower()


        if extension not in allowed_extensions:

            raise HTTPException(
                status_code=400,
                detail=(
                    f"Invalid file type for {file.filename}. "
                    "Only PDF and DOCX files are allowed."
                )
            )


        # ==========================================
        # CREATE FILE PATH
        # ==========================================

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )


        try:

            # ==========================================
            # SAVE RESUME
            # ==========================================

            with open(
                file_path,
                "wb"
            ) as buffer:

                shutil.copyfileobj(
                    file.file,
                    buffer
                )


            # ==========================================
            # 1. EXTRACT RESUME TEXT
            # ==========================================

            resume_text = extract_text(
                file_path
            )


            print("RESUME TEXT:")

            print(
                repr(resume_text)
            )


            # ==========================================
            # CHECK EMPTY RESUME
            # ==========================================

            if not resume_text or not resume_text.strip():

                raise HTTPException(
                    status_code=400,
                    detail=(
                        f"The resume {file.filename} "
                        "is empty or could not be read."
                    )
                )


            # ==========================================
            # 2. NLP ANALYSIS
            # ==========================================

            analysis = process_text(
                resume_text
            )


            # ==========================================
            # 3. EXTRACT SKILLS FROM RESUME
            # ==========================================

            skills = extract_skills(
                resume_text
            )
            certifications = extract_certifications(resume_text)


            print("RESUME SKILLS:")

            print(skills)
            print("CERTIFICATIONS:")
            print(certifications)


            # ==========================================
            # 4. KEYWORD SKILL MATCHING
            # ==========================================

            job_match = compare_skills(
                skills,
                job_skills
            )


            print(
                "========== KEYWORD JOB MATCH =========="
            )

            print(job_match)

            print(
                "======================================="
            )


            # ==========================================
            # 5. SEMANTIC MATCHING
            # ==========================================

            semantic_score = calculate_semantic_similarity(
                resume_text,
                job_description
            )


            print(
                "========== SEMANTIC MATCH SCORE =========="
            )

            print(
                semantic_score
            )

            print(
                "==========================================="
            )


            # ==========================================
            # 6. CALCULATE RESUME SCORE
            # ==========================================

            score = calculate_score(
                resume_text,
                skills
            )


            # ==========================================
            # 7. GENERATE SUGGESTIONS
            # ==========================================

            suggestions = generate_suggestions(
                score
            )


            # ==========================================
            # 8. EXTRACT CONTACT INFORMATION
            # ==========================================

            contact = extract_contact_info(
                resume_text
            )


            print(
                "========== CONTACT =========="
            )

            print(
                contact
            )

            print(
                "============================="
            )
            # ==========================================
            # 9. AI RESUME ANALYSIS USING GEMINI
            # ==========================================

            ai_analysis = analyze_resume_with_llm(
            resume_text,
            job_description,
            skills,
            certifications,
            job_match,
            semantic_score
)


            print(
    "========== AI RESUME ANALYSIS =========="
)

            print(
    ai_analysis
)

            print(
    "========================================="
)


            # ==========================================
            # 10. STORE THIS RESUME'S RESULT
            # ==========================================

            results.append({

                "filename":
                    file.filename,

                "contact":
                    contact,

                "analysis":
                    analysis,

                "skills":
                    skills,

                "job_match":
                    job_match,

                "semantic_score":
                    semantic_score,

                "score":
                    score,

                "suggestions":
                    suggestions,
                "ai_analysis": ai_analysis,
                "certifications": certifications

            })


        except HTTPException:

            raise


        except Exception as e:

            raise HTTPException(

                status_code=500,

                detail=(
                    f"Error processing "
                    f"{file.filename}: {str(e)}"
                )

            )


    # ==========================================
    # CHECK IF ANY RESUMES WERE PROCESSED
    # ==========================================

    if not results:

        raise HTTPException(

            status_code=400,

            detail=(
                "No resumes were successfully processed."
            )

        )


    # ==========================================
    # SORT RESUMES
    # BASED ON SEMANTIC MATCH SCORE
    # ==========================================

    results.sort(

        key=lambda x:
        x["job_match"]["match_score"],
        reverse=True

    )


    # ==========================================
    # ADD RANKING
    # ==========================================

    for index, candidate in enumerate(results):

        candidate["rank"] = index + 1


    # ==========================================
    # RETURN FINAL RESULTS
    # ==========================================

    return {

        "message":
            "All resumes processed successfully",

        "job_skills":
            job_skills,

        "total_candidates":
            len(results),

        "candidates":
            results

    }