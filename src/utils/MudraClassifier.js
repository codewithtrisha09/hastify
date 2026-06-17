import { mudraDatabase } from "./mudraDatabase";

/**
 * Calculate distance between two landmarks
 */
function distance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

/**
 * Get finger angles and positions
 */
function extractHandFeatures(landmarks) {
  // Key finger tip indices in MediaPipe hand landmarks
  const fingerTips = {
    thumb: 4,
    index: 8,
    middle: 12,
    ring: 16,
    pinky: 20,
  };

  const fingerPIPs = {
    thumb: 3,
    index: 6,
    middle: 10,
    ring: 14,
    pinky: 18,
  };

  const palmBase = 0; // Wrist

  const features = {};

  // Calculate finger extension (distance from palm to tip)
  for (const [finger, tipIdx] of Object.entries(fingerTips)) {
    const pipIdx = fingerPIPs[finger];
    const tip = landmarks[tipIdx];
    const pip = landmarks[pipIdx];
    const wrist = landmarks[palmBase];

    features[`${finger}_extended`] =
      distance(tip, wrist) > distance(pip, wrist) * 0.8;
    features[`${finger}_distance`] = distance(tip, wrist);
  }

  // Calculate finger spread (distance between fingers)
  features.index_middle_distance = distance(
    landmarks[fingerTips.index],
    landmarks[fingerTips.middle]
  );
  features.middle_ring_distance = distance(
    landmarks[fingerTips.middle],
    landmarks[fingerTips.ring]
  );
  features.ring_pinky_distance = distance(
    landmarks[fingerTips.ring],
    landmarks[fingerTips.pinky]
  );

  // Finger bending angles
  features.index_bent =
    distance(landmarks[8], landmarks[6]) <
    distance(landmarks[6], landmarks[5]) * 0.6;
  features.middle_bent =
    distance(landmarks[12], landmarks[10]) <
    distance(landmarks[10], landmarks[9]) * 0.6;
  features.ring_bent =
    distance(landmarks[16], landmarks[14]) <
    distance(landmarks[14], landmarks[13]) * 0.6;
  features.pinky_bent =
    distance(landmarks[20], landmarks[18]) <
    distance(landmarks[18], landmarks[17]) * 0.6;

  return features;
}

/**
 * Classify mudra based on hand features
 */
export function classifyMudra(landmarks) {
  const features = extractHandFeatures(landmarks);

  let bestMatch = null;
  let bestScore = 0;

  // Score each mudra
  for (const mudra of mudraDatabase) {
    let score = 0;
    let matchedFeatures = 0;

    // Check each feature requirement
    for (const [feature, required] of Object.entries(mudra.features)) {
      const actual = features[feature];

      if (typeof required === "boolean") {
        if (actual === required) {
          score += 1;
          matchedFeatures += 1;
        }
      }
    }

    // Calculate confidence
    const maxPossibleScore = Object.keys(mudra.features).length;
    const confidence = maxPossibleScore > 0 ? score / maxPossibleScore : 0;

    if (confidence > bestScore) {
      bestScore = confidence;
      bestMatch = {
        name: mudra.name,
        confidence: Math.max(0, Math.min(1, confidence)),
        matchedFeatures: matchedFeatures,
        totalFeatures: maxPossibleScore,
      };
    }
  }

  // Only return if confidence is reasonable
  if (bestMatch && bestMatch.confidence > 0.4) {
    return bestMatch;
  }

  return {
    name: "Unknown Mudra",
    confidence: 0,
    matchedFeatures: 0,
    totalFeatures: 0,
  };
}

/**
 * Calculate accuracy between current mudra and target mudra
 */
export function calculateAccuracy(currentMudra, targetMudra, landmarks) {
  if (currentMudra === targetMudra) {
    const classification = classifyMudra(landmarks);
    return Math.round(classification.confidence * 100);
  }

  const targetData = mudraDatabase.find((m) => m.name === targetMudra);
  const currentData = mudraDatabase.find((m) => m.name === currentMudra);

  if (!targetData || !currentData) return 0;

  // Calculate feature similarity
  let similarFeatures = 0;
  const targetFeatures = targetData.features;

  for (const [feature, value] of Object.entries(targetFeatures)) {
    if (currentData.features[feature] === value) {
      similarFeatures++;
    }
  }

  return Math.round((similarFeatures / Object.keys(targetFeatures).length) * 100);
}
