import { useState } from "react";
import { mudraDatabase, getMudrasByDifficulty } from "../utils/mudraDatabase";
import "../styles/MudraReference.css";

function MudraReference({ onPracticeMudra }) {
  const [selectedMudra, setSelectedMudra] = useState(mudraDatabase[0]);
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMudras = (
    filterDifficulty === "All"
      ? mudraDatabase
      : getMudrasByDifficulty(filterDifficulty)
  ).filter((mudra) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      mudra.name.toLowerCase().includes(term) ||
      mudra.englishName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="mudra-reference">
      <div className="reference-container">
        {/* Sidebar with mudra list */}
        <div className="mudra-list-sidebar">
          <div className="search-section">
            <input
              type="text"
              className="mudra-search-input"
              placeholder="🔍 Search mudras (e.g. Mayura, Peacock)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
            {filteredMudras.length === 0 && (
              <p className="no-results">No mudras match "{searchTerm}"</p>
            )}
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
              <button
                className="practice-btn"
                onClick={() => onPracticeMudra && onPracticeMudra(selectedMudra.name)}
              >
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