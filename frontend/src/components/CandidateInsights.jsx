import { useState } from "react";
import { User, Mail, Phone, Cpu, ThumbsUp, AlertTriangle, Eye, CheckCircle2, ChevronRight } from "lucide-react";

function CandidateInsights({ candidate }) {
  if (!candidate) {
    return (
      <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)" }}>Select a candidate from the Leaderboard to view detailed insights.</p>
      </div>
    );
  }

  // Score metrics
  const score = candidate.score?.score ?? 0;
  const matchScore = candidate.job_match?.match_score ?? 0;
  const semanticScore = candidate.semantic_score ?? 0;

  // Skills mapping
  const backendSkills = candidate.skills || [];
  const matchingSkills = candidate.job_match?.matching_skills || [];
  const missingSkills = candidate.job_match?.missing_skills || [];

  // Standalone skills are skills candidate has, but are not explicitly part of matchingSkills
  const lowercaseMatching = matchingSkills.map(s => s.toLowerCase());
  const standaloneSkills = backendSkills.filter(
    (skill) => !lowercaseMatching.includes(skill.toLowerCase())
  );

  // Grouping skills in domain categories if possible
  const skillDomains = {
    "Programming Languages": ["python", "java", "c", "c++", "c#", "javascript", "typescript", "html", "css"],
    "Frontend Frameworks": ["react", "angular", "vue", "bootstrap", "tailwind css", "tailwind"],
    "Backend & APIs": ["node.js", "express", "fastapi", "flask", "django", "rest api", "api", "json"],
    "Databases": ["sql", "mysql", "postgresql", "mongodb"],
    "CS Fundamentals": ["object-oriented programming", "oop", "data structures", "algorithms", "data structures and algorithms"],
    "Cloud & DevOps": ["docker", "kubernetes", "aws", "azure", "git", "github"],
    "Data Science & AI": ["machine learning", "deep learning", "artificial intelligence", "nlp", "pandas", "numpy", "tensorflow", "pytorch", "opencv"],
    "Soft Skills & Other": ["problem solving", "communication", "teamwork", "leadership", "unit testing", "pytest", "linux"]
  };

  const getSkillCategory = (skillName) => {
    const nameLow = skillName.toLowerCase();
    for (const [category, skillsList] of Object.entries(skillDomains)) {
      if (skillsList.includes(nameLow)) {
        return category;
      }
    }
    return "Soft Skills & Other";
  };

  // Group candidate skills into categories (Matching, Standalone) + Missing Skills
  const categorizedSkills = {};

  // Initialize categories
  Object.keys(skillDomains).forEach((cat) => {
    categorizedSkills[cat] = { matching: [], missing: [], standalone: [] };
  });

  matchingSkills.forEach((skill) => {
    const cat = getSkillCategory(skill);
    categorizedSkills[cat].matching.push(skill);
  });

  missingSkills.forEach((skill) => {
    const cat = getSkillCategory(skill);
    categorizedSkills[cat].missing.push(skill);
  });

  standaloneSkills.forEach((skill) => {
    const cat = getSkillCategory(skill);
    categorizedSkills[cat].standalone.push(skill);
  });

  // Calculate SVG stroke parameters
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981"; // Emerald
    if (score >= 50) return "#f59e0b"; // Warning Orange
    return "#ef4444"; // Error Red
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="candidate-profile-layout">
      {/* Left panel - User Info & Score circles */}
      <div className="profile-meta-card glass-panel">
        <span style={{
          display: "inline-block",
          fontSize: "0.8rem",
          background: "rgba(59, 130, 246, 0.15)",
          color: "var(--primary)",
          padding: "4px 12px",
          borderRadius: "20px",
          fontWeight: 700,
          marginBottom: "16px"
        }}>
          RANK #{candidate.rank}
        </span>
        
        {/* SVG Circular Score Meter */}
        <div className="circular-progress-metric">
          <svg className="metric-circle-shape">
            <circle
              className="circle-track-bg"
              cx="80"
              cy="80"
              r={radius}
            />
            {/* Gradient definition for circular meter */}
            <defs>
              <linearGradient id="scoreColorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={scoreColor} />
                <stop offset="100%" stopColor={scoreColor} stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <circle
              className="circle-progress-fill"
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#scoreColorGradient)"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="circle-text-center">
            <span className="circle-text-score" style={{ color: scoreColor }}>{score}</span>
            <div className="circle-text-label">Score</div>
          </div>
        </div>

        <h3 style={{ fontSize: "1.2rem", marginBottom: "4px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
          {candidate.contact?.name || candidate.filename}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
          File: {candidate.filename}
        </p>

        {/* Linear Match progress */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
            <span>Job Match Quality</span>
            <span>{matchScore}%</span>
          </div>
          <div className="match-bar-track">
            <div
              className="match-bar-fill"
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
            <span>Semantic Similarity</span>
            <span>{semanticScore}%</span>
          </div>
          <div className="match-bar-track" style={{ height: "6px" }}>
            <div
              className="match-bar-fill"
              style={{
                width: `${semanticScore}%`,
                background: "linear-gradient(135deg, var(--primary-cyan), var(--primary-purple))"
              }}
            />
          </div>
        </div>

        {/* Contact info list card */}
        <div className="contact-meta-list">
          <div className="contact-meta-item">
            <User size={14} style={{ color: "var(--text-muted)" }} />
            <span>Name: <strong>{candidate.contact?.name || "N/A"}</strong></span>
          </div>
          <div className="contact-meta-item">
            <Mail size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              Email: <strong>{candidate.contact?.email || "N/A"}</strong>
            </span>
          </div>
          <div className="contact-meta-item">
            <Phone size={14} style={{ color: "var(--text-muted)" }} />
            <span>Phone: <strong>{candidate.contact?.phone || "N/A"}</strong></span>
          </div>
        </div>
      </div>

      {/* Right panel - AI insights and Skills categorizer */}
      <div className="ai-insights-grid">
        {/* Core AI Insights Blocks */}
        {candidate.ai_analysis ? (
          <div className="ai-card-block glass-panel">
            <h3 style={{ color: "var(--primary-purple)" }}>
              <Cpu size={18} />
              AI Insights Overview
            </h3>
            
            <p className="insights-text" style={{ marginBottom: "20px", background: "rgba(255,255,255,0.015)", padding: "16px", borderRadius: "10px" }}>
              <strong>Candidate Summary:</strong> {candidate.ai_analysis.candidate_summary}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px", color: "var(--emerald)" }}>
                  <ThumbsUp size={14} /> Strengths
                </h4>
                <ul className="checklist-styled success-markers">
                  {candidate.ai_analysis.key_strengths?.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  )) || <li>No analysis generated</li>}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px", color: "var(--warning)" }}>
                  <AlertTriangle size={14} /> Focus Areas
                </h4>
                <ul className="checklist-styled critic-markers">
                  {candidate.ai_analysis.missing_or_weak_areas?.map((wa, idx) => (
                    <li key={idx}>{wa}</li>
                  )) || <li>No concerns highlighted</li>}
                </ul>
              </div>
            </div>

            <div style={{ marginBottom: "20px", borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px" }}>🎯 Job Fit Analysis</h4>
              <p className="insights-text">{candidate.ai_analysis.job_fit_analysis}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <h5 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "8px" }}>📚 Skill Recommendations</h5>
                <ul className="checklist-styled">
                  {candidate.ai_analysis.skill_improvement_recommendations?.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  )) || <li>No recommendations</li>}
                </ul>
              </div>
              <div>
                <h5 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "8px" }}>📝 Resume Improvements</h5>
                <ul className="checklist-styled">
                  {candidate.ai_analysis.resume_improvement_suggestions?.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  )) || <li>No suggestions</li>}
                </ul>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                🏆 Recommendation Review
              </h4>
              <p className="insights-text" style={{ fontStyle: "italic", borderLeft: "3px solid var(--primary-purple)", paddingLeft: "12px" }}>
                "{candidate.ai_analysis.final_recommendation}"
              </p>
            </div>
          </div>
        ) : (
          <div className="ai-card-block glass-panel" style={{ textAlign: "center", padding: "30px" }}>
            <Cpu size={24} style={{ color: "var(--text-muted)", marginBottom: "10px" }} />
            <p style={{ color: "var(--text-secondary)" }}>AI Insight models not available for this candidate.</p>
          </div>
        )}

        {/* Skills Categories and Chips */}
        <div className="ai-card-block glass-panel">
          <h3>🧠 Skill Distribution & Gap Analysis</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
            Below are skills mapped by functional domain. You can visually inspect matching qualifications (green), gaps (red), and developer strengths (blue).
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {Object.entries(categorizedSkills).map(([category, types]) => {
              const hasSkills = types.matching.length > 0 || types.missing.length > 0 || types.standalone.length > 0;
              if (!hasSkills) return null;

              return (
                <div key={category} className="skills-block" style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", paddingBottom: "16px" }}>
                  <div className="skills-heading">
                    <ChevronRight size={14} />
                    <span>{category}</span>
                  </div>
                  <div className="chips-container">
                    {/* Matching skill chips */}
                    {types.matching.map((skill, index) => (
                      <span key={"match" + index} className="skill-chip matching" title="Matches job requirements">
                        ✓ {skill}
                      </span>
                    ))}
                    {/* Standalone skill chips */}
                    {types.standalone.map((skill, index) => (
                      <span key={"stand" + index} className="skill-chip standalone" title="Possessed skill (extra)">
                        ✦ {skill}
                      </span>
                    ))}
                    {/* Missing skill chips */}
                    {types.missing.map((skill, index) => (
                      <span key={"miss" + index} className="skill-chip missing" title="Skill missed from requirements">
                        ! {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateInsights;
