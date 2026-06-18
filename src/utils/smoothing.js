// src/utils/smoothing.js
const alpha = 0.3; // Smoothing factor: 0.1 (very smooth/slow) to 0.9 (fast/jittery)
let lastLandmarks = null;

export function smoothLandmarks(currentLandmarks) {
  if (!lastLandmarks) {
    lastLandmarks = currentLandmarks;
    return currentLandmarks;
  }

  const smoothed = currentLandmarks.map((point, i) => ({
    x: point.x * alpha + lastLandmarks[i].x * (1 - alpha),
    y: point.y * alpha + lastLandmarks[i].y * (1 - alpha),
    z: point.z * alpha + lastLandmarks[i].z * (1 - alpha),
  }));

  lastLandmarks = smoothed;
  return smoothed;
}