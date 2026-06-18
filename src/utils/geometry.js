// src/utils/geometry.js
export function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function getNormalizedDistance(landmarks, p1Idx, p2Idx) {
  // Use wrist(0) and middle MCP(9) as the "ruler" for hand size
  const palmSize = getDistance(landmarks[0], landmarks[9]);
  const dist = getDistance(landmarks[p1Idx], landmarks[p2Idx]);
  return dist / (palmSize || 1); 
}

export function getAngle(a, b, c) {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  return angle > 180 ? 360 - angle : angle;
}

export function isFingerExtended(landmarks, baseIdx, pipIdx, tipIdx) {
  const angle = getAngle(landmarks[baseIdx], landmarks[pipIdx], landmarks[tipIdx]);
  return angle > 160; // Returns true if finger is straight
}