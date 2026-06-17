import { useEffect, useRef, useState } from "react";
import { mudraDatabase } from "../utils/mudraDatabase";
import { classifyMudra } from "../utils/mudraClassifier";
import "../styles/MudraDetector.css";

function MudraDetector({ onMudraDetected, practiceMode = false }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting Hastify...");
  const [detectedMudra, setDetectedMudra] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [targetMudra, setTargetMudra] = useState(
    practiceMode ? "Pataka" : null
  );
  const [handLandmarks, setHandLandmarks] = useState(null);

  useEffect(() => {
    initializeDetector();
    return () => {
      // Cleanup
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const initializeDetector = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Wait for MediaPipe scripts
    const waitForMP = () => {
      return new Promise((resolve) => {
        const check = () => {
          if (window.Hands && window.Camera && window.drawConnectors && window.drawLandmarks) {
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

            // Classify the mudra
            mudraData = classifyMudra(landmarks);
            setHandLandmarks(landmarks);
          }
        }
      }

      // Validate hand size
      if (detected && handLandmarks) {
        const xs = handLandmarks.map((p) => p.x);
        const ys = handLandmarks.map((p) => p.y);

        const width = Math.max(...xs) - Math.min(...xs);
        const height = Math.max(...ys) - Math.min(...ys);

        if (width < 0.1 || height < 0.1) {
          detected = false;
          mudraData = null;
        }
      }

      // Update status and mudra
      if (detected && mudraData) {
        setStatus(`🖐 Hand Detected - ${mudraData.name}`);
        setDetectedMudra(mudraData.name);
        setConfidence(Math.round(mudraData.confidence * 100));

        // Calculate accuracy if in practice mode
        if (practiceMode && targetMudra) {
          const accuracyScore =
            mudraData.name === targetMudra
              ? mudraData.confidence * 100
              : Math.max(0, 50 - Math.abs(mudraData.confidence * 100 - 50));
          setAccuracy(Math.round(accuracyScore));

          onMudraDetected({
            detected: mudraData.name,
            confidence: mudraData.confidence,
            accuracy: accuracyScore,
            target: targetMudra,
          });
        }
      } else {
        setStatus("🔍 Show a mudra to the camera");
        setDetectedMudra(null);
        setConfidence(0);
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

  const getMudraDetails = () => {
    return mudraDatabase.find((m) => m.name === detectedMudra);
  };

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
          <div className="info-card confidence-card">
            <h3>Detection Confidence</h3>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <p className="confidence-value">{confidence}%</p>
          </div>

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

          {practiceMode && (
            <div className="info-card practice-card">
              <h3>Accuracy Score</h3>
              <div className="accuracy-score">
                <span className="score-value">{accuracy}%</span>
                <span className="target-mudra">Target: {targetMudra}</span>
              </div>
            </div>
          )}

          {!detectedMudra && (
            <div className="info-card">
              <h3>💡 Tip</h3>
              <p>
                Position your hand clearly in front of the camera. Make sure
                your hand is well-lit and fills most of the frame.
              </p>
            </div>
          )}
        </div>
      </div>

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
                {mudra.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
}

export default MudraDetector;