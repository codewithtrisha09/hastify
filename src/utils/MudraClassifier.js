// src/utils/MudraClassifier.js
import { smoothLandmarks } from "./smoothing";
import { isFingerExtended, getNormalizedDistance } from "./geometry";
import { mudraDatabase } from "./mudraDatabase";

export function classifyMudra(rawLandmarks) {
  // 1. Smooth the jitter immediately
  const landmarks = smoothLandmarks(rawLandmarks);

  // 2. Use geometry logic to define the state of the hand
  const features = {
    index_extended: isFingerExtended(landmarks, 5, 6, 8),
    middle_extended: isFingerExtended(landmarks, 9, 10, 12),
    ring_extended: isFingerExtended(landmarks, 13, 14, 16),
    pinky_extended: isFingerExtended(landmarks, 17, 18, 20),
    // Use normalized distance to detect thumb position accurately
    thumb_distance: getNormalizedDistance(landmarks, 0, 4) 
  };

  // 3. Match against database
  return mudraDatabase.find(mudra => {
    // Pataka logic: fingers extended AND thumb tucked (small distance)
    if (mudra.name === "Pataka") {
      return features.index_extended && features.middle_extended && features.thumb_distance < 0.3;
    }
    // Ardhachandra logic: fingers extended AND thumb out (large distance)
    if (mudra.name === "Ardhachandra") {
      return features.index_extended && features.middle_extended && features.thumb_distance > 0.4;
    }
    return false;
  }) || { name: "Unknown" };
}