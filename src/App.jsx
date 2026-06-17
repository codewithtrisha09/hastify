import { useEffect, useRef, useState } from "react";
import "./App.css";
import MudraReference from "./components/MudraReference";
import MudraDetector from "./components/MudraDetector";
import PerformanceMetrics from "./components/PerformanceMetrics";

function App() {
  const [currentView, setCurrentView] = useState("detector"); // detector, reference, practice
  const [mudraStats, setMudraStats] = useState({
    detected: null,
    confidence: 0,
    accuracy: 0,
  });

  const handleMudraDetected = (mudraData) => {
    setMudraStats(mudraData);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🪷 Hastify</h1>
          <p className="app-subtitle">Master Bharatnatyam Mudras with AI</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-bar">
        <button
          className={`nav-btn ${currentView === "detector" ? "active" : ""}`}
          onClick={() => setCurrentView("detector")}
        >
          📹 Live Detector
        </button>
        <button
          className={`nav-btn ${currentView === "reference" ? "active" : ""}`}
          onClick={() => setCurrentView("reference")}
        >
          📚 Mudra Reference
        </button>
        <button
          className={`nav-btn ${currentView === "practice" ? "active" : ""}`}
          onClick={() => setCurrentView("practice")}
        >
          🎯 Practice Mode
        </button>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {currentView === "detector" && (
          <MudraDetector onMudraDetected={handleMudraDetected} />
        )}
        {currentView === "reference" && <MudraReference />}
        {currentView === "practice" && (
          <div className="practice-mode">
            <MudraDetector
              practiceMode={true}
              onMudraDetected={handleMudraDetected}
            />
            {mudraStats.detected && (
              <PerformanceMetrics mudraStats={mudraStats} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🙏 Learn at your own pace • Perfect your mudras • Enhance your art
        </p>
      </footer>
    </div>
  );
}

export default App;