import { Trophy, FileText, ArrowRight, Star } from "lucide-react";

function Leaderboard({ candidates, onSelectCandidate }) {
  if (!candidates || candidates.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: "40px", textWrap: "balance", textAlign: "center" }}>
        <Trophy size={48} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />
        <h3>No Rankings Available</h3>
        <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
          Upload resumes and enter a job description to trigger candidate score matching and ranking.
        </p>
      </div>
    );
  }

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return "top-1";
    if (rank === 2) return "top-2";
    if (rank === 3) return "top-3";
    return "normal";
  };

  const getScoreColorClass = (score) => {
    if (score >= 80) return "status-green-bg";
    if (score >= 50) return "status-orange-bg";
    return "status-red-bg";
  };

  return (
    <div className="ranking-table-card">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Candidate Resume</th>
            <th>Resume Score</th>
            <th>Job Match</th>
            <th>Semantic Similarity</th>
            <th style={{ textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => {
            const matchScore = candidate.job_match?.match_score ?? 0;
            const resumeScore = candidate.score?.score ?? 0;
            const semanticScore = candidate.semantic_score ?? 0;

            return (
              <tr key={candidate.filename}>
                <td>
                  <span className={`rank-badge ${getRankBadgeClass(candidate.rank)}`}>
                    {candidate.rank}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FileText size={18} style={{ color: "var(--text-secondary)" }} />
                    <span style={{ fontWeight: 600 }}>{candidate.filename}</span>
                    {candidate.rank === 1 && (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "2px",
                        background: "rgba(245, 158, 11, 0.15)",
                        color: "#fbbf24",
                        fontSize: "0.7rem",
                        padding: "2px 6px",
                        borderRadius: "12px",
                        fontWeight: "bold"
                      }}>
                        <Star size={10} fill="#fbbf24" /> Best Fit
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="table-bar-container">
                    <span style={{ fontWeight: "700", minWidth: "30px" }}>{resumeScore}</span>
                    <div className="table-bar-track">
                      <div
                        className={`table-bar-fill ${getScoreColorClass(resumeScore)}`}
                        style={{ width: `${resumeScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-bar-container">
                    <span style={{ fontWeight: "700", minWidth: "40px" }}>{matchScore}%</span>
                    <div className="table-bar-track">
                      <div
                        className="table-bar-fill"
                        style={{
                          width: `${matchScore}%`,
                          background: "var(--gradient-cyan)"
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{
                    fontWeight: 600,
                    color: semanticScore >= 60 ? "var(--emerald)" : "var(--text-secondary)"
                  }}>
                    {semanticScore}%
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="secondary btn-interactive"
                    style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                    onClick={() => onSelectCandidate(candidate)}
                  >
                    View Details
                    <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
