function JobMatchCard({ jobMatch }) {

    // Check if job match data exists
    if (!jobMatch) {
        return (
            <div>
                <h2>🎯 Job Match Analysis</h2>

                <p>
                    Job match data is not available.
                </p>
            </div>
        );
    }

    // Get matching skills safely
    const matchingSkills =
        jobMatch.matching_skills || [];

    // Get missing skills safely
    const missingSkills =
        jobMatch.missing_skills || [];

    // Get match score safely
    const matchScore =
        jobMatch.match_score ?? 0;

    return (
        <div>

            <h2>
                🎯 Job Match Analysis
            </h2>

            {/* Job Match Score */}

            <h3>
                Job Match Score
            </h3>

            <p>
                {matchScore}%
            </p>


            {/* Matching Skills */}

            <h3>
                ✅ Matching Skills
            </h3>

            {matchingSkills.length > 0 ? (

                <ul>

                    {matchingSkills.map(
                        (skill, index) => (

                            <li key={index}>
                                {skill}
                            </li>

                        )
                    )}

                </ul>

            ) : (

                <p>
                    No matching skills found.
                </p>

            )}


            {/* Missing Skills */}

            <h3>
                ❌ Missing Skills
            </h3>

            {missingSkills.length > 0 ? (

                <ul>

                    {missingSkills.map(
                        (skill, index) => (

                            <li key={index}>
                                {skill}
                            </li>

                        )
                    )}

                </ul>

            ) : (

                <p>
                    No missing skills! 🎉
                </p>

            )}

        </div>
    );
}

export default JobMatchCard;