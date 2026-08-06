import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Overview from "./components/Overview";
import UploadBox from "./components/UploadBox";
import Leaderboard from "./components/Leaderboard";
import CandidateInsights from "./components/CandidateInsights";
import Settings from "./components/Settings";

// Styling
import "./App.css";

function App() {
  // Global States
  const [currentView, setCurrentView] = useState("landing");
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync dark/light class on root HTML document
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  }, [isDarkMode]);

  // Navigate to detailed inspect view on selection
  const handleSelectCandidateAndView = (candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView("insights");
  };

  // KPI Calculations
  const getTopScore = () => {
    if (!result?.candidates || result.candidates.length === 0) return 0;
    return Math.max(...result.candidates.map((c) => c.score?.score ?? 0));
  };

  const getAvgMatchScore = () => {
    if (!result?.candidates || result.candidates.length === 0) return 0;
    const scores = result.candidates.map((c) => c.job_match?.match_score ?? 0);
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    return Math.round((sum / scores.length) * 100) / 100;
  };

  // API Call - Upload and match resumes
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a role description.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("job_description", jobDescription);

    setLoading(true);
    setResult(null);
    setSelectedCandidate(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload", formData);
      setResult(response.data);
      console.log("MATCH RUN RESULT:", response.data);

      // Auto-set the first ranked candidate as active for deep inspect triggers
      if (response.data?.candidates?.length > 0) {
        setSelectedCandidate(response.data.candidates[0]);
      }
    } catch (error) {
      console.error("ANALYSIS FAILED:", error);
      alert(
        error.response?.data?.detail ||
        error.message ||
        "An unexpected error occurred during document parsing."
      );
    } finally {
      setLoading(false);
    }
  };

  // Conditional Content Renderer
  const renderContentView = () => {
    switch (currentView) {
      case "overview":
        return (
          <Overview
            totalCandidates={result?.candidates?.length || 0}
            topCandidateScore={getTopScore()}
            avgMatchScore={getAvgMatchScore()}
            onNavigateToAnalyzer={() => setCurrentView("analyzer")}
          />
        );
      case "analyzer":
        return (
          <UploadBox
            files={files}
            onFilesChange={setFiles}
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            loading={loading}
            onSubmit={handleUpload}
            result={result}
            onSelectCandidate={handleSelectCandidateAndView}
          />
        );
      case "leaderboard":
        return (
          <Leaderboard
            candidates={result?.candidates || []}
            onSelectCandidate={handleSelectCandidateAndView}
          />
        );
      case "insights":
        return <CandidateInsights candidate={selectedCandidate} />;
      case "settings":
        return <Settings isDarkMode={isDarkMode} onThemeToggle={() => setIsDarkMode(!isDarkMode)} />;
      default:
        return (
          <Overview
            totalCandidates={result?.candidates?.length || 0}
            topCandidateScore={getTopScore()}
            avgMatchScore={getAvgMatchScore()}
            onNavigateToAnalyzer={() => setCurrentView("analyzer")}
          />
        );
    }
  };

  // If on landing view, render LandingPage standalone
  if (currentView === "landing") {
    return <LandingPage onGetStarted={() => setCurrentView("overview")} />;
  }

  return (
    <div className={`app-container ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <div className="dashboard-layout">
        {/* Left Interactive Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          totalCandidates={result?.candidates?.length || 0}
        />

        {/* Right Content Space */}
        <main className="main-content">
          <div className="radial-glow"></div>
          
          <Navbar
            currentView={currentView}
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            totalCandidates={result?.candidates?.length || 0}
          />

          <div className="content-body">
            {renderContentView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;