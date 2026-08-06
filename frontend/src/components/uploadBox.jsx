import DragDropUpload from "./DragDropUpload";
import JobDescriptionCard from "./JobDescriptionCard";
import { Play, Sparkles, FileText, ArrowRight, CheckCircle2, ListFilter } from "lucide-react";

function UploadBox({
  files,
  onFilesChange,
  jobDescription,
  onJobDescriptionChange,
  loading,
  onSubmit,
  result,
  onSelectCandidate
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Configuration Form Row */}
      <div className="analyzer-form-grid">
        {/* Left Card - Resumes Upload */}
        <div className="glass-panel" style={{ padding: "28px" }}>
          <h3 className="form-title">
            <FileText size={18} style={{ color: "var(--primary)" }} />
            1. Upload Resume Batch
          </h3>
          <DragDropUpload files={files} onFilesChange={onFilesChange} loading={loading} />
        </div>

        {/* Right Card - Job Descrition */}
        <div className="glass-panel" style={{ padding: "28px" }}>
          <h3 className="form-title">
            <ListFilter size={18} style={{ color: "var(--primary-purple)" }} />
            2. Match Against Specifications
          </h3>
          <JobDescriptionCard value={jobDescription} onChange={onJobDescriptionChange} loading={loading} />
        </div>
      </div>

      {/* Action Button Segment */}
      <div className="action-trigger-panel">
        <button
          className="analyze-button-glow btn btn-interactive"
          onClick={onSubmit}
          disabled={loading || files.length === 0 || !jobDescription.trim()}
        >
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="loading-spinner" />
              <span>Scanning applicant files...</span>
            </div>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              Analyze Resumes
            </>
          )}
        </button>
      </div>

      {/* Skeleton Loading Panel */}
      {loading && (
        <div className="skeleton-loader">
          <div className="skeleton-item" style={{ height: "120px" }}></div>
          <div className="skeleton-item" style={{ height: "120px" }}></div>
          <div className="skeleton-item" style={{ height: "120px" }}></div>
        </div>
      )}

      {/* Quick Summary Results Panel if ready */}
      {result && result.candidates && !loading && (
        <div className="glass-panel" style={{ padding: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Scanned Results <CheckCircle2 size={18} style={{ color: "var(--emerald)" }} />
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
                Total profiles parsed successfully: <strong>{result.total_candidates}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {result.candidates.map((candidate) => {
              const score = candidate.score?.score ?? 0;
              const matchScore = candidate.job_match?.match_score ?? 0;

              return (
                <div
                  key={candidate.filename}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    background: "rgba(255,255,255,0.01)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: candidate.rank === 1 ? "rgba(245, 158, 11, 0.15)" : "var(--border-color)",
                      color: candidate.rank === 1 ? "#fbbf24" : "var(--text-secondary)",
                      fontWeight: "bold",
                      fontSize: "0.85rem"
                    }}>
                      #{candidate.rank}
                    </span>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                        {candidate.contact?.name || candidate.filename}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "8px" }}>
                        ({candidate.filename})
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Fit Score</div>
                      <div style={{ fontWeight: "bold", color: "var(--primary-purple)" }}>{score}/100</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Job Match</div>
                      <div style={{ fontWeight: "bold", color: "var(--emerald)" }}>{matchScore}%</div>
                    </div>
                    
                    <button
                      className="secondary btn-interactive"
                      style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                      onClick={() => onSelectCandidate(candidate)}
                    >
                      View Report
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBox;