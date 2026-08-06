import { LayoutDashboard, FileText, Trophy, Cpu, Settings as SettingsIcon, LogOut } from "lucide-react";

function Sidebar({ currentView, onViewChange, totalCandidates }) {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "analyzer", label: "Resume Analyzer", icon: FileText },
    { id: "leaderboard", label: "Candidate Rankings", icon: Trophy, badge: totalCandidates > 0 ? totalCandidates : null },
    { id: "insights", label: "AI Insights", icon: Cpu },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span>Resume AI</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-item btn-interactive ${isActive ? "active" : ""}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  marginLeft: "auto",
                  background: "var(--primary)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  padding: "2px 6px",
                  borderRadius: "10px",
                  fontWeight: "bold"
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">AD</div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ fontWeight: 600, fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Admin Dashboard
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            admin@resume.ai
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
