import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting Hastify...");

  useEffect(() => {
    start();
  }, []);

  const start = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let lastStatus = "";

    const updateStatus = (newStatus) => {
      if (lastStatus !== newStatus) {
        lastStatus = newStatus;
        setStatus(newStatus);
      }
    };

    // Wait for MediaPipe scripts
    const waitForMP = () => {
      return new Promise((resolve) => {
        const check = () => {
          if (window.Hands && window.Camera) resolve();
          else setTimeout(check, 100);
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
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8,
    });

    hands.onResults((results) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      let detected = false;

      if (
        results.multiHandLandmarks &&
        results.multiHandedness &&
        results.multiHandedness.length > 0
      ) {
        const score = results.multiHandedness[0]?.score || 0;

        // Draw only if confident detection
        if (score > 0.8) {
          for (const landmarks of results.multiHandLandmarks) {
            window.drawConnectors(
              ctx,
              landmarks,
              window.Hands.HAND_CONNECTIONS
            );
            window.drawLandmarks(ctx, landmarks);
          }

          detected = true;
        }
      }

      // Extra safety: reject tiny fake detections
      if (detected && results.multiHandLandmarks?.length > 0) {
        const lm = results.multiHandLandmarks[0];

        const xs = lm.map((p) => p.x);
        const ys = lm.map((p) => p.y);

        const width = Math.max(...xs) - Math.min(...xs);
        const height = Math.max(...ys) - Math.min(...ys);

        if (width < 0.15 || height < 0.15) {
          detected = false;
        }
      }

      if (detected) {
        updateStatus("🖐 Hand Detected");
      } else {
        updateStatus("No Hand Detected");
      }
    });

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
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
    };
  };

  return (
    <div className="app">
      <h1>🪷 Hastify</h1>
      <p className="status">{status}</p>

      <video ref={videoRef} style={{ display: "none" }} />

      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          border: "3px solid #b30059",
          borderRadius: "12px",
        }}
      />
    </div>
  );
}

export default App;