import { useState } from "react";
import { mudraDatabase, getMudrasByDifficulty } from "../utils/mudraDatabase";
import "../styles/MudraReference.css";

function MudraReference() {
  const [selectedMudra, setSelectedMudra] = useState(mudraDatabase[0]);
  const [filterDifficulty, setFilterDifficulty] = useState("All");

  const filteredMudras =
    filterDifficulty === "All"
      ? mudraDatabase
      : getMudrasByDifficulty(filterDifficulty);

  return (
    <div className="mudra-reference">
      <div className="reference-container">
        {/* Sidebar with mudra list */}
        <div className="mudra-list-sidebar">
          <div className="filter-section">
            <h3>Filter by Difficulty</h3>
            <div className="filter-buttons">
              {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  className={`filter-btn ${
                    filterDifficulty === difficulty ? "active" : ""
                  }`}
                  onClick={() => setFilterDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div className="mudra-list">
            <h3>Mudras ({filteredMudras.length})</h3>
            {filteredMudras.map((mudra) => (
              <div
                key={mudra.id}
                className={`mudra-list-item ${
                  selectedMudra.id === mudra.id ? "active" : ""
                }`}
                onClick={() => setSelectedMudra(mudra)}
              >
                <div className="mudra-item-header">
                  <span className="mudra-list-name">{mudra.name}</span>
                  <span
                    className={`difficulty-badge difficulty-${mudra.difficulty.toLowerCase()}`}
                  >
                    {mudra.difficulty}
                  </span>
                </div>
                <span className="mudra-english">{mudra.englishName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="mudra-detail">
          <div className="mudra-header">
            <h2>{selectedMudra.name}</h2>
            <p className="english-name">{selectedMudra.englishName}</p>
            <span
              className={`difficulty-badge difficulty-${selectedMudra.difficulty.toLowerCase()}`}
            >
              {selectedMudra.difficulty} Difficulty
            </span>
          </div>

          <div className="mudra-content">
            {/* Visual representation placeholder */}
            <div className="mudra-visual">
              <div className="placeholder-image">
                <span>🖐️</span>
                <p>Mudra Visualization</p>
              </div>
            </div>

            {/* Information cards */}
            <div className="info-cards">
              <div className="info-card">
                <h4>Meaning</h4>
                <p>{selectedMudra.meaning}</p>
              </div>

              <div className="info-card">
                <h4>Description</h4>
                <p>{selectedMudra.description}</p>
              </div>

              <div className="info-card">
                <h4>Finger Position</h4>
                <p>{selectedMudra.fingers}</p>
              </div>

              <div className="info-card">
                <h4>Visual Characteristic</h4>
                <p>{selectedMudra.visualCharacteristic}</p>
              </div>

              <div className="info-card uses-card">
                <h4>Represents / Used For</h4>
                <div className="uses-list">
                  {selectedMudra.usedFor.map((use, idx) => (
                    <span key={idx} className="use-tag">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Practice button */}
            <div className="practice-section">
              <button className="practice-btn">
                📹 Practice This Mudra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MudraReference;
