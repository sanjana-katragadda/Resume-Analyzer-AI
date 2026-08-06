function AIAnalysisCard({ aiAnalysis }) {

    if (!aiAnalysis) {
        return null;
    }

    return (
        <div
            style={{
                border: "2px solid #4f46e5",
                borderRadius: "12px",
                padding: "20px",
                marginTop: "20px",
                backgroundColor: "#f8f7ff"
            }}
        >

            <h2>
                🤖 AI Resume Insights
            </h2>

            {/* Candidate Summary */}
            <div>
                <h3>👤 Candidate Summary</h3>

                <p>
                    {aiAnalysis.candidate_summary}
                </p>
            </div>


            {/* Key Strengths */}
            <div>
                <h3>💪 Key Strengths</h3>

                {aiAnalysis.key_strengths &&
                    aiAnalysis.key_strengths.length > 0 ? (

                    <ul>
                        {aiAnalysis.key_strengths.map(
                            (strength, index) => (
                                <li key={index}>
                                    {strength}
                                </li>
                            )
                        )}
                    </ul>

                ) : (
                    <p>
                        No strengths available.
                    </p>
                )}
            </div>


            {/* Missing or Weak Areas */}
            <div>
                <h3>⚠️ Missing or Weak Areas</h3>

                {aiAnalysis.missing_or_weak_areas &&
                    aiAnalysis.missing_or_weak_areas.length > 0 ? (

                    <ul>
                        {aiAnalysis.missing_or_weak_areas.map(
                            (area, index) => (
                                <li key={index}>
                                    {area}
                                </li>
                            )
                        )}
                    </ul>

                ) : (
                    <p>
                        No missing or weak areas identified.
                    </p>
                )}
            </div>


            {/* Job Fit Analysis */}
            <div>
                <h3>🎯 Job Fit Analysis</h3>

                <p>
                    {aiAnalysis.job_fit_analysis}
                </p>
            </div>


            {/* Skill Improvement */}
            <div>
                <h3>📚 Skill Improvement Recommendations</h3>

                {aiAnalysis.skill_improvement_recommendations &&
                    aiAnalysis.skill_improvement_recommendations.length > 0 ? (

                    <ul>
                        {aiAnalysis.skill_improvement_recommendations.map(
                            (recommendation, index) => (
                                <li key={index}>
                                    {recommendation}
                                </li>
                            )
                        )}
                    </ul>

                ) : (
                    <p>
                        No skill recommendations available.
                    </p>
                )}
            </div>


            {/* Resume Improvement */}
            <div>
                <h3>📝 Resume Improvement Suggestions</h3>

                {aiAnalysis.resume_improvement_suggestions &&
                    aiAnalysis.resume_improvement_suggestions.length > 0 ? (

                    <ul>
                        {aiAnalysis.resume_improvement_suggestions.map(
                            (suggestion, index) => (
                                <li key={index}>
                                    {suggestion}
                                </li>
                            )
                        )}
                    </ul>

                ) : (
                    <p>
                        No resume improvement suggestions available.
                    </p>
                )}
            </div>


            {/* Final Recommendation */}
            <div>
                <h3>🏆 Final Recommendation</h3>

                <p>
                    {aiAnalysis.final_recommendation}
                </p>
            </div>

        </div>
    );
}

export default AIAnalysisCard;