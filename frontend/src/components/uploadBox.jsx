import axios from "axios";
import { useState } from "react";
import JobMatchCard from "./JobMatchCard";
import ScoreCard from "./ScoreCard";
import SkillsCard from "./SkillsCard";
import AIAnalysisCard from "./AIAnalysisCard";

function UploadBox() {
    const [files, setFiles] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Select multiple resumes
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    // Upload resumes
    const handleUpload = async () => {

        if (files.length === 0) {
            alert("Please select a resume.");
            return;
        }

        if (!jobDescription.trim()) {
            alert("Please enter a Job Description.");
            return;
        }

        // Create FormData
        const formData = new FormData();

        // Add all selected resumes
        files.forEach((file) => {
            formData.append("files", file);
        });

        // Add Job Description
        formData.append(
            "job_description",
            jobDescription
        );

        setLoading(true);

        try {

            // Send data to FastAPI
            const response = await axios.post(
                "http://127.0.0.1:8000/upload",
                formData
            );

            // Check backend response
            console.log(
                "BACKEND RESPONSE:",
                response.data
            );

            // Store response
            setResult(response.data);

        } catch (error) {

            console.log(
                "FULL ERROR:",
                error
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            alert(
                error.response?.data?.detail ||
                error.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            {/* ================================= */}
            {/* RESUME FILE UPLOAD */}
            {/* ================================= */}

            <input
                type="file"
                accept=".pdf,.docx"
                multiple
                onChange={handleFileChange}
            />

            {/* ================================= */}
            {/* SHOW SELECTED RESUMES */}
            {/* ================================= */}

            {files.length > 0 && (
                <div>

                    <h4>
                        Selected Resumes:
                    </h4>

                    <ul>

                        {files.map(
                            (file, index) => (

                                <li key={index}>
                                    {file.name}
                                </li>

                            )
                        )}

                    </ul>

                </div>
            )}

            <br />
            <br />

            {/* ================================= */}
            {/* JOB DESCRIPTION */}
            {/* ================================= */}

            <textarea
                placeholder="Paste the Job Description here..."
                value={jobDescription}
                onChange={(e) =>
                    setJobDescription(e.target.value)
                }
                rows="10"
                cols="50"
            />

            <br />
            <br />

            {/* ================================= */}
            {/* ANALYZE BUTTON */}
            {/* ================================= */}

            <button onClick={handleUpload}>
                Analyze Resumes
            </button>

            {/* ================================= */}
            {/* LOADING MESSAGE */}
            {/* ================================= */}

            {loading && (
                <p>
                    Analyzing Resumes...
                </p>
            )}

            {/* ================================= */}
            {/* RESULTS */}
            {/* ================================= */}

            {result &&
                result.candidates && (

                <div>

                    <h2>
                        Resume Comparison Results
                    </h2>

                    <h3>
                        Total Candidates:
                        {" "}
                        {result.total_candidates}
                    </h3>


                    {/* ================================= */}
                    {/* DISPLAY EACH CANDIDATE */}
                    {/* ================================= */}

                    {result.candidates.map(
                        (candidate) => (

                        <div key={candidate.filename}>

                            {/* Candidate Rank */}

                            <h2>
                                Rank #{candidate.rank}
                            </h2>


                            {/* Resume Name */}

                            <h3>
                                Resume:
                                {candidate.filename}
                            </h3>


                            {/* ================================= */}
                            {/* RESUME SCORE */}
                            {/* ================================= */}

                            <ScoreCard
                                score={
                                    candidate.score.score }
                            />


                            {/* ================================= */}
                            {/* RESUME SKILLS */}
                            {/* ================================= */}

                            <SkillsCard
                                skills={
                                    candidate.skills
                                }
                            />


                            {/* ================================= */}
                            {/* JOB MATCH */}
                            {/* ================================= */}

                            <JobMatchCard
                                jobMatch={
                                    candidate.job_match
                                }
                            />
                            {/* ================================= */}
{/* AI RESUME ANALYSIS */}
{/* ================================= */}

<AIAnalysisCard
    aiAnalysis={
        candidate.ai_analysis
    }
/>


                            {/* ================================= */}
                            {/* SEMANTIC MATCH SCORE */}
                            {/* ================================= */}

                            <div>

                                <h3>
                                    🧠 Semantic Match Score
                                </h3>

                                <p>
                                    {
                                        candidate.semantic_score !== undefined
                                            ? `${candidate.semantic_score}%`
                                            : "Semantic score not available"
                                    }
                                </p>

                            </div>


                            <hr />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default UploadBox;