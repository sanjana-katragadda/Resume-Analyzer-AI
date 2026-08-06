import { Shield, Key, Eye, FileUp, Sun, Moon } from "lucide-react";

function Settings({ isDarkMode, onThemeToggle }) {
  return (
    <div className="glass-panel" style={{ padding: "32px", maxWidth: "800px" }}>
      <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>Dashboard Preferences</h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "32px" }}>
        Configure theme preferences, parsing defaults, and API structures.
      </p>

      <div className="settings-box">
        {/* Toggle Theme Row */}
        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-title">Interface Style Toggle</span>
            <span className="setting-desc">Switch between Dark Mode default and Light Mode appearance.</span>
          </div>
          <button
            className="secondary btn-interactive"
            onClick={onThemeToggle}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {isDarkMode ? (
              <>
                <Sun size={16} /> Light Theme
              </>
            ) : (
              <>
                <Moon size={16} /> Dark Theme
              </>
            )}
          </button>
        </div>

        {/* API config */}
        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-title">FastAPI Endpoint</span>
            <span className="setting-desc">The server URL location handling document extraction and AI evaluations.</span>
          </div>
          <input
            placeholder="http://127.0.0.1:8000"
            disabled
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              backgroundColor: "rgba(255,255,255,0.02)",
              color: "var(--text-muted)",
              width: "200px",
              fontSize: "0.85rem",
              textAlign: "right"
            }}
          />
        </div>

        {/* Mock LLM configuration */}
        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-title">Active AI Engine</span>
            <span className="setting-desc">Large Language Model used to evaluate applicant resumes.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontSize: "0.85rem",
              background: "rgba(168, 85, 247, 0.1)",
              color: "var(--primary-purple)",
              padding: "4px 10px",
              borderRadius: "12px",
              fontWeight: "bold"
            }}>
              Gemini Pro
            </span>
          </div>
        </div>

        {/* Mock Max Resume Batch */}
        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-title">Concurrently Processed Batches</span>
            <span className="setting-desc">Limit the number of PDF/Word files loaded simultaneously.</span>
          </div>
          <select
            defaultValue="5"
            disabled
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              backgroundColor: "rgba(0,0,0,0.15)",
              color: "var(--text-secondary)",
              outline: "none"
            }}
          >
            <option value="5">5 Resumes</option>
            <option value="10">10 Resumes</option>
            <option value="20">20 Resumes</option>
          </select>
        </div>

        {/* Security checks */}
        <div className="setting-row" style={{ borderBottom: "none" }}>
          <div className="setting-info">
            <span className="setting-title">Privacy Protection Safeguards</span>
            <span className="setting-desc">All document parse jobs run locally. No data files are exposed externally.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--emerald)", fontSize: "0.85rem", fontWeight: "bold" }}>
            <Shield size={16} /> Secured
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
