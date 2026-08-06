import { ArrowRight, Cpu, ShieldCheck, Zap, BarChart2, Star, Sparkles } from "lucide-react";

function LandingPage({ onGetStarted }) {
  const features = [
    {
      iconActual: Cpu,
      title: "Google Gemini Analysis",
      desc: "Get automated summaries, strengths, focus points, and job recommendations from our advanced integration model.",
    },
    {
      icon: ZebraIcon, // wait, let's use standard Zap / ShieldCheck
      iconActual: Zap,
      title: "Real-time Skill Gap Check",
      desc: "Instantly cross-references your resume against job summaries to highlight matching, missing, and extra skill sets.",
    },
    {
      iconActual: ShieldCheck,
      title: "Score Prediction Engine",
      desc: "Estimates the fit index (0-100) based on extraction and NLP models tuned to candidate capabilities.",
    },
    {
      iconActual: BarChart2,
      title: "Multi-Candidate Leaderboards",
      desc: "Analyze and rank batch files concurrently to pinpoint top matches via automated semantic scoring.",
    },
  ];

  function ZebraIcon() {
    return <Zap size={20} />;
  }

  return (
    <div className="landing-shell">
      <div className="landing-glow-top"></div>
      
      {/* Landing Navbar */}
      <header className="landing-navbar">
        <div className="logo-display">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px", color: "var(--primary-purple)" }}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>Resume.AI</span>
        </div>
        <button className="secondary btn-interactive" onClick={onGetStarted}>
          Launch App
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Automate Resume Screening with <span>AI Insights</span>
          </h1>
          <p>
            An advanced analyzer to parse applicant templates, evaluate technical capability profiles, grade match quotients, and surface perfect fits in minutes.
          </p>
          <div className="hero-cta">
            <button className="primary btn-interactive" onClick={onGetStarted}>
              Get Started Free <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Animated illustration card */}
        <div className="hero-illustration">
          <div className="ill-glow"></div>
          <div className="illustration-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }}></span>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }}></span>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}></span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>Gemini-Pro-Analysis</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div className="user-avatar" style={{ width: "32px", height: "32px", fontSize: "0.80rem" }}>JD</div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Jane Doe - Sr. Developer</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Software_Engineer_Resume.pdf</div>
              </div>
            </div>

            <div className="ill-line active"></div>
            <div className="ill-line md"></div>
            <div className="ill-line sh"></div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={14} style={{ color: "var(--primary-purple)" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: "bold" }}>Overall Score</span>
              </div>
              <span style={{ fontSize: "0.95rem", fontWeight: "bold", color: "var(--emerald)" }}>92/100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Outline */}
      <section className="section-headline">
        <h2>Built with Modern Algorithms</h2>
        <p>Analyze semantic similarity, grade keywords, and extract soft skills indicators inside multiple files comprehensively.</p>
      </section>

      <section className="features-grid">
        {features.map((feat, index) => {
          const Icon = feat.iconActual;
          return (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <Icon size={20} />
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          );
        })}
      </section>

      {/* How it works */}
      <section className="section-headline" style={{ marginTop: "20px" }}>
        <h2>How It Works</h2>
        <p>A simple step process to match talent pipelines with role descriptions.</p>
      </section>

      <section className="how-it-works">
        <div className="steps-list">
          <div className="step-item">
            <span className="step-num">1</span>
            <div className="step-content">
              <h3>Upload Resumes</h3>
              <p>Drag and drop PDF or DOCX resume folders into the unified analyzer dropzone.</p>
            </div>
          </div>

          <div className="step-item">
            <span className="step-num">2</span>
            <div className="step-content">
              <h3>Define Roles</h3>
              <p>Paste the qualifications, requirements, and tech stack details inside the job description panel.</p>
            </div>
          </div>

          <div className="step-item">
            <span className="step-num">3</span>
            <div className="step-content">
              <h3>Evaluate & Compare</h3>
              <p>Review the computed leaderboards, match score metrics, semantic similarity indicators, and key AI summaries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="stats-banner">
        <div className="stat-item">
          <h2>95%+</h2>
          <p>Accuracy Quotient</p>
        </div>
        <div className="stat-item">
          <h2>&lt; 5s</h2>
          <p>Analysis Speed per File</p>
        </div>
        <div className="stat-item">
          <h2>Gemini</h2>
          <p>Powered Insights Models</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div>&copy; {new Date().getFullYear()} Resume AI. All rights reserved.</div>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
