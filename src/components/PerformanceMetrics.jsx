import { useEffect, useState } from "react";
import "../styles/PerformanceMetrics.css";

function PerformanceMetrics({ mudraStats }) {
  const [attempts, setAttempts] = useState([]);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (mudraStats && mudraStats.detected) {
      const newAttempt = {
        id: Date.now(),
        mudra: mudraStats.detected,
        accuracy: mudraStats.accuracy,
        confidence: mudraStats.confidence,
        timestamp: new Date(),
        status:
          mudraStats.detected === mudraStats.target ? "✓ Correct" : "✗ Wrong",
      };

      setAttempts((prev) => [...prev, newAttempt].slice(-10)); // Keep last 10 attempts

      // Calculate statistics
      const allAccuracies = [
        ...attempts.map((a) => a.accuracy),
        mudraStats.accuracy,
      ];
      const avg =
        allAccuracies.reduce((a, b) => a + b, 0) / allAccuracies.length;
      const best = Math.max(...allAccuracies);

      setAverageAccuracy(Math.round(avg));
      setBestScore(Math.round(best));
    }
  }, [mudraStats]);

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return "excellent";
    if (accuracy >= 60) return "good";
    if (accuracy >= 40) return "fair";
    return "poor";
  };

  return (
    <div className="performance-metrics">
      <div className="metrics-header">
        <h2>📊 Practice Statistics</h2>
      </div>

      <div className="metrics-grid">
        {/* Overall Stats */}
        <div className="metric-card stat-card">
          <div className="stat-item">
            <span className="stat-label">Average Accuracy</span>
            <span className="stat-value">{averageAccuracy}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Best Score</span>
            <span className="stat-value">{bestScore}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Attempts</span>
            <span className="stat-value">{attempts.length}</span>
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="metric-card attempts-card">
          <h3>Recent Attempts</h3>
          <div className="attempts-list">
            {attempts.length === 0 ? (
              <p className="no-data">Start practicing to see your attempts!</p>
            ) : (
              attempts
                .slice()
                .reverse()
                .slice(0, 5)
                .map((attempt) => (
                  <div
                    key={attempt.id}
                    className={`attempt-item attempt-${getAccuracyColor(
                      attempt.accuracy
                    )}`}
                  >
                    <div className="attempt-info">
                      <span className="attempt-mudra">{attempt.mudra}</span>
                      <span className="attempt-status">{attempt.status}</span>
                    </div>
                    <div className="attempt-score">
                      <span className="accuracy">{attempt.accuracy}%</span>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Accuracy Breakdown */}
      <div className="accuracy-breakdown">
        <h3>Accuracy Distribution</h3>
        <div className="accuracy-chart">
          <div className="accuracy-bar">
            <div className="bar-label">
              <span>Excellent (80-100%)</span>
              <span className="count">
                {attempts.filter((a) => a.accuracy >= 80).length}
              </span>
            </div>
            <div className="bar-fill">
              <div
                className="fill excellent"
                style={{
                  width: `${
                    attempts.length > 0
                      ? (attempts.filter((a) => a.accuracy >= 80).length /
                          attempts.length) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="accuracy-bar">
            <div className="bar-label">
              <span>Good (60-79%)</span>
              <span className="count">
                {
                  attempts.filter(
                    (a) => a.accuracy >= 60 && a.accuracy < 80
                  ).length
                }
              </span>
            </div>
            <div className="bar-fill">
              <div
                className="fill good"
                style={{
                  width: `${
                    attempts.length > 0
                      ? (attempts.filter(
                          (a) => a.accuracy >= 60 && a.accuracy < 80
                        ).length /
                          attempts.length) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="accuracy-bar">
            <div className="bar-label">
              <span>Fair (40-59%)</span>
              <span className="count">
                {
                  attempts.filter(
                    (a) => a.accuracy >= 40 && a.accuracy < 60
                  ).length
                }
              </span>
            </div>
            <div className="bar-fill">
              <div
                className="fill fair"
                style={{
                  width: `${
                    attempts.length > 0
                      ? (attempts.filter(
                          (a) => a.accuracy >= 40 && a.accuracy < 60
                        ).length /
                          attempts.length) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="accuracy-bar">
            <div className="bar-label">
              <span>Needs Practice (&lt;40%)</span>
              <span className="count">
                {attempts.filter((a) => a.accuracy < 40).length}
              </span>
            </div>
            <div className="bar-fill">
              <div
                className="fill poor"
                style={{
                  width: `${
                    attempts.length > 0
                      ? (attempts.filter((a) => a.accuracy < 40).length /
                          attempts.length) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="tips-section">
        <h3>💡 Practice Tips</h3>
        <ul className="tips-list">
          <li>Keep your hand steady and well-lit</li>
          <li>Position your hand in the center of the frame</li>
          <li>Make sure your entire hand is visible</li>
          <li>Practice in front of a bright window or lamp</li>
          <li>Start with easier mudras before advancing</li>
        </ul>
      </div>
    </div>
  );
}

export default PerformanceMetrics;
