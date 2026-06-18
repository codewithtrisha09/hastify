import { useEffect, useRef, useState } from "react";
import { mudraDatabase } from "../utils/mudraDatabase";
import {
  classifyMudra,
  extractHandFeatures,
  classifyMudraWithML as classifyMudraWithMLImpl,
} from "../utils/mudraClassifier";
import "../styles/MudraDetector.css";

function MudraDetector({
  onMudraDetected,
  practiceMode = false,
  initialTargetMudra = null,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [status, setStatus] = useState("Starting Hastify...");
  const [detectedMudra, setDetectedMudra] = useState(null);
  const [targetMudra, setTargetMudra] = useState(
    practiceMode ? initialTargetMudra || mudraDatabase[0].name : null
  );
  const [confidence, setConfidence] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSessions, setRecordedSessions] = useState([]);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [mlAccuracy, setMlAccuracy] = useState(0);

  useEffect(() => {
    initializeDetector();
    loadSessions();
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (practiceMode && initialTargetMudra) {
      setTargetMudra(initialTargetMudra);
    }
  }, [initialTargetMudra]);

  const loadSessions = () => {
    const saved = localStorage.getItem("hastify_sessions");
    if (saved) {
      setRecordedSessions(JSON.parse(saved));
    }
  };

  const startRecording = async () => {
    try {
      const canvas = canvasRef.current;
      const stream = canvas.captureStream(30);
      
      // Add audio from microphone if available
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStream.getAudioTracks().forEach(track => stream.addTrack(track));
      } catch (e) {
        console.log("Audio not available, continuing with video only");
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        saveSession(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setDetectionHistory([]);
      setStatus("🔴 Recording...");
    } catch (err) {
      console.error("Recording error:", err);
      setStatus("❌ Recording failed");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatus("✅ Recording saved!");
    }
  };

  const saveSession = (videoBlob) => {
    const videoUrl = URL.createObjectURL(videoBlob);
    const session = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      targetMudra: targetMudra,
      videoUrl: videoUrl,
      duration: detectionHistory.length,
      detectionHistory: detectionHistory,
      accuracy: Math.round(
        detectionHistory.reduce((sum, d) => sum + d.accuracy, 0) /
          detectionHistory.length || 0
      ),
    };

    const updated = [session, ...recordedSessions];
    setRecordedSessions(updated);
    localStorage.setItem("hastify_sessions", JSON.stringify(updated));
    setStatus("💾 Session saved!");
  };

  const initializeDetector = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Wait for MediaPipe scripts
    const waitForMP = () => {
      return new Promise((resolve) => {
        const check = () => {
          if (
            window.Hands &&
            window.Camera &&
            window.drawConnectors &&
            window.drawLandmarks
          ) {
            resolve();
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    };

    await waitForMP();

    const hands = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      let detected = false;
      let mudraData = null;
      let features = null;

      if (
        results.multiHandLandmarks &&
        results.multiHandedness &&
        results.multiHandedness.length > 0
      ) {
        const score = results.multiHandedness[0]?.score || 0;

        if (score > 0.7) {
          for (const landmarks of results.multiHandLandmarks) {
            window.drawConnectors(ctx, landmarks, window.Hands.HAND_CONNECTIONS);
            window.drawLandmarks(ctx, landmarks);
            detected = true;

            // Extract features for ML
            features = extractHandFeatures(landmarks);
            mudraData = classifyMudraWithML(features);
          }
        }
      }

      // Validate hand size
      if (detected && results.multiHandLandmarks) {
        const landmarks = results.multiHandLandmarks[0];
        const xs = landmarks.map((p) => p.x);
        const ys = landmarks.map((p) => p.y);

        const width = Math.max(...xs) - Math.min(...xs);
        const height = Math.max(...ys) - Math.min(...ys);

        if (width < 0.1 || height < 0.1) {
          detected = false;
          mudraData = null;
        }
      }

      // Update UI
      if (detected && mudraData) {
        setStatus(
          `🖐 Detected: ${mudraData.name} (${mudraData.mlAccuracy}%)`
        );
        setDetectedMudra(mudraData.name);
        setConfidence(mudraData.confidence);
        setMlAccuracy(mudraData.mlAccuracy);

        // Calculate accuracy in practice mode
        if (practiceMode && targetMudra) {
          const accuracyScore =
            mudraData.name === targetMudra
              ? mudraData.mlAccuracy
              : Math.max(0, mudraData.mlAccuracy - 30);
          
          setAccuracy(Math.round(accuracyScore));

          // Record detection
          if (isRecording) {
            setDetectionHistory((prev) => [
              ...prev,
              {
                timestamp: Date.now(),
                detected: mudraData.name,
                target: targetMudra,
                accuracy: Math.round(accuracyScore),
                isCorrect: mudraData.name === targetMudra,
              },
            ]);
          }

          onMudraDetected({
            detected: mudraData.name,
            confidence: mudraData.confidence,
            accuracy: Math.round(accuracyScore),
            target: targetMudra,
            mlAccuracy: mudraData.mlAccuracy,
          });
        }
      } else {
        setStatus("🔍 Show a mudra to the camera");
        setDetectedMudra(null);
        setConfidence(0);
        setMlAccuracy(0);
      }
    });

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 } },
    });

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();

      const camera = new window.Camera(video, {
        onFrame: async () => {
          await hands.send({ image: video });
        },
        width: 640,
        height: 480,
      });

      camera.start();
      setStatus("🎬 Camera ready - Show a mudra!");
    };
  };

  // Improved ML-based classification (delegates to utils/mudraClassifier.js,
  // which handles both boolean and numeric features with proper weighting)
  const classifyMudraWithML = (features) => classifyMudraWithMLImpl(features);

  const getMudraDetails = () => {
    return mudraDatabase.find((m) => m.name === detectedMudra);
  };

  const getComparisonFeedback = () => {
    if (!detectedMudra || !targetMudra) return null;
    
    const isCorrect = detectedMudra === targetMudra;
    
    return {
      isCorrect,
      feedback: isCorrect
        ? `✅ Perfect! You're doing ${targetMudra} correctly!`
        : `❌ You're showing ${detectedMudra}, but target is ${targetMudra}. Keep practicing!`,
      color: isCorrect ? "#27ae60" : "#e74c3c",
    };
  };

  const comparison = getComparisonFeedback();

  return (
    <div className="mudra-detector">
      <div className="detector-container">
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="detector-canvas"
          />
          <div className="status-overlay">
            <span className="status-text">{status}</span>
          </div>
        </div>

        <div className="detector-info">
          {/* Comparison Card */}
          {practiceMode && comparison && (
            <div
              className="info-card comparison-card"
              style={{ borderLeftColor: comparison.color }}
            >
              <h3>Mudra Comparison</h3>
              <div className="comparison-content">
                <div className="mudra-row">
                  <span className="label">Target:</span>
                  <span className="mudra-name">{targetMudra}</span>
                </div>
                <div className="mudra-row">
                  <span className="label">Detected:</span>
                  <span
                    className="mudra-name"
                    style={{ color: comparison.color }}
                  >
                    {detectedMudra}
                  </span>
                </div>
                <p className="feedback" style={{ color: comparison.color }}>
                  {comparison.feedback}
                </p>
              </div>
            </div>
          )}

          {/* ML Accuracy Card */}
          <div className="info-card confidence-card">
            <h3>ML Accuracy</h3>
            <div className="ml-accuracy-display">
              <div className="accuracy-ring">
                <svg
                  width="120"
                  height="120"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#ffe8cc"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#ff9500"
                    strokeWidth="8"
                    strokeDasharray={`${(mlAccuracy / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="accuracy-text">{mlAccuracy}%</div>
              </div>
            </div>
            <p className="accuracy-label">
              {mlAccuracy >= 80
                ? "🎯 Excellent!"
                : mlAccuracy >= 60
                ? "👍 Good!"
                : mlAccuracy >= 40
                ? "📈 Fair"
                : "🔄 Keep trying"}
            </p>
          </div>

          {/* Practice Accuracy */}
          {practiceMode && (
            <div className="info-card practice-card">
              <h3>Practice Score</h3>
              <p className="score-value">{accuracy}%</p>
              <p className="target-mudra">Target: {targetMudra}</p>
            </div>
          )}

          {/* Recording Control */}
          {practiceMode && (
            <div className="info-card recording-card">
              <h3>Record Session</h3>
              <button
                className={`record-btn ${isRecording ? "recording" : ""}`}
                onClick={
                  isRecording ? stopRecording : startRecording
                }
              >
                {isRecording ? "🔴 Stop Recording" : "⭕ Start Recording"}
              </button>
              {isRecording && (
                <p className="recording-info">
                  Recording... {detectionHistory.length} frames
                </p>
              )}
            </div>
          )}

          {detectedMudra && (
            <div className="info-card mudra-card">
              <h3>Detected Mudra</h3>
              <p className="mudra-name">{detectedMudra}</p>
              {getMudraDetails() && (
                <p className="mudra-meaning">
                  {getMudraDetails().meaning}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Practice Controls */}
      {practiceMode && (
        <div className="practice-controls">
          <label>Select Mudra to Practice:</label>
          <select
            value={targetMudra}
            onChange={(e) => setTargetMudra(e.target.value)}
            className="mudra-select"
          >
            {mudraDatabase.map((mudra) => (
              <option key={mudra.name} value={mudra.name}>
                {mudra.name} - {mudra.englishName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Recorded Sessions */}
      {recordedSessions.length > 0 && (
        <div className="sessions-section">
          <h3>📹 Recorded Sessions ({recordedSessions.length})</h3>
          <div className="sessions-list">
            {recordedSessions.map((session) => (
              <div key={session.id} className="session-card">
                <div className="session-info">
                  <span className="session-date">{session.timestamp}</span>
                  <span className="session-mudra">{session.targetMudra}</span>
                  <span className="session-accuracy">{session.accuracy}%</span>
                </div>
                <div className="session-actions">
                  <a
                    href={session.videoUrl}
                    download={`hastify-${session.id}.webm`}
                    className="download-btn"
                  >
                    ⬇️ Download
                  </a>
                  <button
                    onClick={() => window.open(session.videoUrl)}
                    className="play-btn"
                  >
                    ▶️ Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
}

export default MudraDetector;