import { FileText, Trophy, Cpu, Zap, ArrowRight, Sparkles } from "lucide-react";

function Overview({ totalCandidates, topCandidateScore, avgMatchScore, onNavigateToAnalyzer }) {
  return (
    <div>
      {/* Welcome Banner */}
      <div className="overview-banner">
        <div>
          <h2 className="overview-banner-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Resume Intelligence Suite <Sparkles size={24} style={{ color: "var(--primary-purple)" }} />
          </h2>
          <p className="overview-banner-desc">
            Welcome to your unified candidate screening dashboard. Analyze multiple resume applications, grade qualifications, and match positions against candidates using LLM insights.
          </p>
          <button
            className="primary btn-interactive"
            onClick={onNavigateToAnalyzer}
            style={{ marginTop: "20px" }}
          >
            Start New Screening <ArrowRight size={16} />
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Elegant decorative SVG radar/shield preview */}
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary-purple)", opacity: 0.8 }}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="overview-kpis">
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span>Candidates Analyzed</span>
            <FileText className="kpi-icon" />
          </div>
          <div className="kpi-value">{totalCandidates}</div>
          <div className="kpi-desc">Total processed in current session</div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span>Highest Fit Grade</span>
            <Trophy className="kpi-icon" />
          </div>
          <div className="kpi-value">
            {topCandidateScore > 0 ? `${topCandidateScore}/100` : "N/A"}
          </div>
          <div className="kpi-desc">Top ranking candidate resume score</div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span>Average Job Match</span>
            <Zap className="kpi-icon" />
          </div>
          <div className="kpi-value">
            {avgMatchScore > 0 ? `${avgMatchScore}%` : "N/A"}
          </div>
          <div className="kpi-desc">Mean keyword matching percentage</div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span>System Status</span>
            <Cpu className="kpi-icon" />
          </div>
          <div className="kpi-value" style={{ fontSize: "1.5rem", color: "var(--emerald)", fontWeight: 700, height: "52px", display: "flex", alignItems: "center" }}>
            Ready
          </div>
          <div className="kpi-desc">Gemini analysis models active</div>
        </div>
      </div>

      {/* Modern CSS chart visualization panel */}
      {totalCandidates > 0 ? (
        <div className="glass-panel" style={{ padding: "28px", marginTop: "24px" }}>
          <h3 style={{ fontSize: "1.15rem", marginBottom: "16px" }}>Candidate Fit Summary</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "24px" }}>
            Comparison graph mapping resume grades against parsed job description criteria.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "0.85rem", width: "100px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>Best Candidate</span>
              <div style={{ flex: 1, height: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ width: `${topCandidateScore}%`, height: "100%", background: "var(--gradient-brand)" }} />
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>{topCandidateScore}%</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "0.85rem", width: "100px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>Average Match</span>
              <div style={{ flex: 1, height: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ width: `${avgMatchScore}%`, height: "100%", background: "var(--gradient-cyan)" }} />
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>{avgMatchScore}%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: "40px", textAlign: "center", marginTop: "24px" }}>
          <p style={{ color: "var(--text-secondary)" }}>No analytical metrics recorded. Load files using the Resume Analyzer tab.</p>
        </div>
      )}
    </div>
  );
}

export default Overview;
