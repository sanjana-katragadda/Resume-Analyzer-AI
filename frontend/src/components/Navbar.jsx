import { Sun, Moon, Cpu, Wifi } from "lucide-react";

function Navbar({ currentView, isDarkMode, onThemeToggle, totalCandidates }) {
  const getHeaderTitle = () => {
    switch (currentView) {
      case "overview":
        return "Dashboard Overview";
      case "analyzer":
        return "Resume Analyzer Intelligence";
      case "leaderboard":
        return "Candidate Rankings Leaderboard";
      case "insights":
        return "AI Resume Insights Deep Dive";
      case "settings":
        return "System Settings & Preferences";
      default:
        return "Control Panel";
    }
  };

  return (
    <header className="navbar">
      <div className="nav-title">{getHeaderTitle()}</div>

      <div className="nav-actions">
        {/* Status Indicators */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "0.8rem",
          color: "var(--emerald)",
          background: "rgba(16, 185, 129, 0.1)",
          padding: "4px 10px",
          borderRadius: "20px",
          fontWeight: 500
        }}>
          <Wifi size={14} />
          <span>API Connected</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn btn-interactive"
          onClick={onThemeToggle}
          title={isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
          aria-label={isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="user-avatar" style={{ border: "2px solid var(--border-color)" }}>
          AD
        </div>
      </div>
    </header>
  );
}

export default Navbar;
