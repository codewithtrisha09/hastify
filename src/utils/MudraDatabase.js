/**
 * Bharatnatyam Mudra Database
 * Contains mudra definitions with their identifying features
 */

export const mudraDatabase = [
  {
    id: 1,
    name: "Pataka",
    englishName: "Flag/Banner",
    meaning:
      "Represents a flag, banner, going, single leaf of a tree, wind, and moonlight",
    description:
      "Fingers are straight and joined together, hand is flat. Used to represent concepts like wind, moon, and movement.",
    fingers: "All extended and joined",
    visualCharacteristic: "Flat hand with all fingers extended",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      index_bent: false,
      middle_bent: false,
      ring_bent: false,
      pinky_bent: false,
    },
    usedFor: [
      "Wind",
      "Moon",
      "Going",
      "Flag",
      "Direction",
      "Single object",
    ],
    imageUrl: "/mudras/pataka.png",
    videoUrl: "/mudras/pataka.mp4",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Tripataka",
    englishName: "Triple Flag",
    meaning: "Three-fingered flag indicating multiple objects or trinity",
    description:
      "Similar to Pataka but with the thumb folded. Index, middle, and ring fingers are extended.",
    fingers: "Index, middle, ring extended; pinky and thumb folded",
    visualCharacteristic:
      "Three fingers extended, thumb and pinky bent back",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: false,
      index_bent: false,
      middle_bent: false,
      ring_bent: false,
      pinky_bent: true,
    },
    usedFor: ["Three objects", "Trinity", "Three directions"],
    imageUrl: "/mudras/tripataka.png",
    videoUrl: "/mudras/tripataka.mp4",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Ardhapataka",
    englishName: "Half Flag",
    meaning: "Half of the flag gesture",
    description:
      "Ring and pinky fingers are folded while index and middle are extended together.",
    fingers: "Index and middle extended; ring and pinky folded",
    visualCharacteristic: "Two middle fingers extended, outer fingers bent",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: false,
      pinky_extended: false,
      index_bent: false,
      middle_bent: false,
      ring_bent: true,
      pinky_bent: true,
    },
    usedFor: ["Two objects", "Going in one direction", "Gate"],
    imageUrl: "/mudras/ardhapataka.png",
    videoUrl: "/mudras/ardhapataka.mp4",
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Kartarimukha",
    englishName: "Scissor Mouth",
    meaning: "Represents scissors or a narrow opening",
    description:
      "Index and middle fingers are opened in a V-shape while other fingers are folded.",
    fingers: "Index and middle spread; ring, pinky folded",
    visualCharacteristic: "V-shaped opening between index and middle fingers",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: false,
      pinky_extended: false,
      index_middle_distance: 0.08,
    },
    usedFor: ["Scissors", "Narrow opening", "Entering", "Cutting"],
    imageUrl: "/mudras/kartarimukha.png",
    videoUrl: "/mudras/kartarimukha.mp4",
    difficulty: "Medium",
  },
  {
    id: 5,
    name: "Mayura",
    englishName: "Peacock",
    meaning: "Represents the pride and beauty of a peacock",
    description:
      "All fingers are spread out wide like a peacock's feathers. Fingers are slightly curved.",
    fingers: "All fingers spread widely apart",
    visualCharacteristic: "Hand spread wide, fingers separated",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      index_middle_distance: 0.12,
      middle_ring_distance: 0.12,
      ring_pinky_distance: 0.12,
    },
    usedFor: ["Peacock", "Beauty", "Pride", "Large objects"],
    imageUrl: "/mudras/mayura.png",
    videoUrl: "/mudras/mayura.mp4",
    difficulty: "Medium",
  },
  {
    id: 6,
    name: "Ardhacandra",
    englishName: "Half Moon",
    meaning: "Represents a half moon or crescent shape",
    description:
      "Thumb and index finger form an arc shape, other fingers are folded. Resembles a crescent.",
    fingers: "Thumb and index in crescent shape; others folded",
    visualCharacteristic: "Curved arch between thumb and index",
    features: {
      thumb_extended: true,
      index_extended: true,
      middle_extended: false,
      ring_extended: false,
      pinky_extended: false,
    },
    usedFor: ["Moon", "Crescent", "Curve", "Arch"],
    imageUrl: "/mudras/ardhacandra.png",
    videoUrl: "/mudras/ardhacandra.mp4",
    difficulty: "Medium",
  },
  {
    id: 7,
    name: "Mukula",
    englishName: "Bud",
    meaning: "Represents a closed flower bud",
    description:
      "All fingers are slightly bent and curled together, resembling a closed flower bud.",
    fingers: "All fingers gently curved and touching",
    visualCharacteristic: "Closed fist with fingers gently touching",
    features: {
      index_bent: true,
      middle_bent: true,
      ring_bent: true,
      pinky_bent: true,
    },
    usedFor: ["Flower bud", "Closed fist", "Small object"],
    imageUrl: "/mudras/mukula.png",
    videoUrl: "/mudras/mukula.mp4",
    difficulty: "Easy",
  },
  {
    id: 8,
    name: "Tamrachuda",
    englishName: "Cock's Comb",
    meaning: "Represents the comb of a rooster",
    description:
      "Thumb and index form a ring, middle finger stands up, others folded.",
    fingers: "Thumb-index ring, middle extended",
    visualCharacteristic: "One finger pointing up through thumb-index circle",
    features: {
      middle_extended: true,
      index_extended: true,
      ring_extended: false,
      pinky_extended: false,
      index_bent: false,
      middle_bent: false,
    },
    usedFor: ["Rooster", "Cock", "Single upright object"],
    imageUrl: "/mudras/tamrachuda.png",
    videoUrl: "/mudras/tamrachuda.mp4",
    difficulty: "Hard",
  },
  {
    id: 9,
    name: "Shikhara",
    englishName: "Peak/Spire",
    meaning: "Represents a mountain peak or temple spire",
    description:
      "Thumb and index form a peak, other fingers folded. Looks like a pointed spire.",
    fingers: "Thumb and index pointing up; others folded",
    visualCharacteristic: "Pointed peak formed by thumb and index",
    features: {
      index_extended: true,
      middle_extended: false,
      ring_extended: false,
      pinky_extended: false,
      index_bent: false,
    },
    usedFor: ["Mountain", "Temple spire", "Peak", "Sharp point"],
    imageUrl: "/mudras/shikhara.png",
    videoUrl: "/mudras/shikhara.mp4",
    difficulty: "Hard",
  },
  {
    id: 10,
    name: "Chandrakala",
    englishName: "Moon Phase",
    meaning: "Represents different phases of the moon",
    description:
      "Fingers curve in a specific pattern to represent celestial movements.",
    fingers: "Specific curved pattern",
    visualCharacteristic: "Curved, crescent-like appearance",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      index_middle_distance: 0.06,
    },
    usedFor: ["Moon phases", "Celestial objects", "Time"],
    imageUrl: "/mudras/chandrakala.png",
    videoUrl: "/mudras/chandrakala.mp4",
    difficulty: "Hard",
  },
];

/**
 * Get mudra by name
 */
export function getMudraByName(name) {
  return mudraDatabase.find((m) => m.name === name);
}

/**
 * Get mudra by id
 */
export function getMudraById(id) {
  return mudraDatabase.find((m) => m.id === id);
}

/**
 * Get all mudra names
 */
export function getAllMudraNames() {
  return mudraDatabase.map((m) => m.name);
}

/**
 * Filter mudras by difficulty
 */
export function getMudrasByDifficulty(difficulty) {
  return mudraDatabase.filter((m) => m.difficulty === difficulty);
}

/**
 * Get mudras used for a specific meaning
 */
export function getMudrasForMeaning(meaning) {
  return mudraDatabase.filter((m) =>
    m.usedFor.some((use) =>
      use.toLowerCase().includes(meaning.toLowerCase())
    )
  );
}
