/**
 * Bharatnatyam Mudra Database - Complete 28 Asamyuta Hastas
 * (Single-hand gestures, per Abhinaya Darpana / Natya Shastra)
 *
 * Feature flags map to what utils/mudraClassifier.js extracts from
 * MediaPipe hand landmarks (21-point model).
 */

export const mudraDatabase = [
  {
    id: 1,
    name: "Pataka",
    englishName: "Flag",
    meaning: "A flag or banner; also clouds, forest, river, denial",
    description:
      "All four fingers are held straight and pressed together, palm flat and facing forward. The thumb is bent inward across the palm.",
    fingers: "Index, middle, ring, pinky straight & joined; thumb bent in",
    visualCharacteristic: "Flat open palm, like signaling 'stop'",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      thumb_extended: false,
      fingers_together: true,
    },
    usedFor: ["Flag", "Clouds", "Forest", "River", "Beginning of dance"],
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Tripataka",
    englishName: "Three Parts of a Flag",
    meaning: "Trees, arrows, a crown, thunder",
    description:
      "Starting from Pataka, the ring finger alone is bent down while index, middle, and pinky stay straight and joined.",
    fingers: "Index, middle, pinky extended; ring finger bent",
    visualCharacteristic: "Pataka with the ring finger folded down",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: false,
      ring_bent: true,
      pinky_extended: true,
      thumb_extended: false,
    },
    usedFor: ["Trees", "Arrow", "Crown", "Thunder", "Lighting a lamp"],
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Ardhapataka",
    englishName: "Half Flag",
    meaning: "A leaf, a board or slab, the number two",
    description:
      "From Tripataka, the little finger is also bent down, leaving only the index and middle finger extended and joined.",
    fingers: "Index and middle extended; ring and pinky bent",
    visualCharacteristic: "Only two upright fingers remain, close together",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: false,
      ring_bent: true,
      pinky_extended: false,
      pinky_bent: true,
      thumb_extended: false,
    },
    usedFor: ["Leaf", "Slab/Board", "Two", "Knife"],
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Kartarimukha",
    englishName: "Scissors Face",
    meaning: "Separation, opposition, lightning, the corner of an eye",
    description:
      "From Ardhapataka, the index and middle fingers are opened apart from each other like an open pair of scissors, while the ring and pinky stay folded and the thumb holds them down.",
    fingers: "Index and middle spread apart; ring and pinky bent",
    visualCharacteristic: "V-shaped scissor opening between index and middle",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: false,
      pinky_extended: false,
      index_middle_distance: 0.1,
    },
    usedFor: ["Scissors", "Opposition", "Separation", "Lightning"],
    difficulty: "Medium",
  },
  {
    id: 5,
    name: "Mayura",
    englishName: "Peacock",
    meaning: "A peacock, a creeping vine, applying a Tilak mark",
    description:
      "The tip of the ring finger touches the tip of the thumb, while the index, middle, and pinky fingers stay extended and separated like peacock feathers.",
    fingers: "Index, middle, pinky extended; ring touches thumb tip",
    visualCharacteristic: "Ring finger curled to meet thumb, others fanned out",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: false,
      ring_bent: true,
      pinky_extended: true,
      thumb_distance: 0.04,
    },
    usedFor: ["Peacock", "Creeper vine", "Applying tilak", "Pouring water"],
    difficulty: "Medium",
  },
  {
    id: 6,
    name: "Ardhachandra",
    englishName: "Half Moon",
    meaning: "The crescent moon, a spear, the throat, meditation",
    description:
      "Like Pataka, but the thumb is also extended outward in line with the rest of the palm rather than folded in, forming a crescent-like silhouette.",
    fingers: "All five fingers extended, including the thumb",
    visualCharacteristic: "Open flat palm with thumb stretched out to the side",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      thumb_extended: true,
      fingers_together: true,
    },
    usedFor: ["Crescent moon", "Spear", "Throat", "Blessing"],
    difficulty: "Easy",
  },
  {
    id: 7,
    name: "Araala",
    englishName: "Bent / Curved",
    meaning: "Drinking, a harsh wind, nectar",
    description:
      "From Ardhachandra, only the index finger is curved inward while the middle, ring, and pinky remain straight and upright; the thumb stays slightly bent to the side.",
    fingers: "Index bent/curved; middle, ring, pinky straight",
    visualCharacteristic: "One curved finger among three straight ones",
    features: {
      index_extended: false,
      index_bent: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
    },
    usedFor: ["Drinking", "Strong wind", "Nectar", "Poison"],
    difficulty: "Medium",
  },
  {
    id: 8,
    name: "Shukatunda",
    englishName: "Parrot's Beak",
    meaning: "A parrot, shooting an arrow, longing for home",
    description:
      "Similar to Kartarimukha, but the index finger is curved as well, so both index and middle curl slightly to resemble a parrot's hooked beak; ring and pinky stay folded.",
    fingers: "Index and middle both curved; ring and pinky bent",
    visualCharacteristic: "Two curved fingers forming a beak-like hook",
    features: {
      index_extended: false,
      index_bent: true,
      middle_extended: false,
      middle_bent: true,
      ring_extended: false,
      pinky_extended: false,
    },
    usedFor: ["Parrot", "Shooting an arrow", "Spear", "Riddles"],
    difficulty: "Hard",
  },
  {
    id: 9,
    name: "Mushti",
    englishName: "Fist",
    meaning: "Grasping, steadiness, a fighting stance, strength",
    description:
      "All four fingers are curled into the palm to form a closed fist, with the thumb resting either over or tucked beside the curled fingers.",
    fingers: "All fingers curled into a closed fist",
    visualCharacteristic: "Clenched fist",
    features: {
      index_extended: false,
      middle_extended: false,
      ring_extended: false,
      pinky_extended: false,
      index_curled: true,
      middle_curled: true,
      ring_curled: true,
      pinky_curled: true,
      fingers_together: true,
    },
    usedFor: ["Grasping", "Steadiness", "Strength", "Combat stance"],
    difficulty: "Easy",
  },
  {
    id: 10,
    name: "Shikhara",
    englishName: "Peak / Spire",
    meaning: "A bow, a pillar, a king, remembering, asking a question",
    description:
      "Starting from Mushti, the thumb alone is raised upright above the closed fist, similar to a thumbs-up gesture.",
    fingers: "Closed fist with thumb raised upright",
    visualCharacteristic: "Thumbs-up shape",
    features: {
      index_extended: false,
      middle_extended: false,
      ring_extended: false,
      pinky_extended: false,
      thumb_extended: true,
      fingers_together: true,
    },
    usedFor: ["Bow", "Pillar", "King", "Asking a question"],
    difficulty: "Easy",
  },
  {
    id: 11,
    name: "Kapitha",
    englishName: "Wood Apple",
    meaning: "Holding cymbals, Lakshmi, Saraswati, a wood apple",
    description:
      "From Shikhara, the index finger bends down to rest against the raised thumb while the rest of the fist stays closed.",
    fingers: "Index curled over the thumb; rest of hand a closed fist",
    visualCharacteristic: "Thumb-up shape with index finger hooked over it",
    features: {
      index_extended: false,
      index_bent: true,
      middle_extended: false,
      ring_extended: false,
      pinky_extended: false,
      thumb_extended: true,
    },
    usedFor: ["Wood apple", "Cymbals", "Goddess Lakshmi/Saraswati"],
    difficulty: "Medium",
  },
  {
    id: 12,
    name: "Katakamukha",
    englishName: "Bracelet Opening",
    meaning: "Picking flowers, holding a garland, drawing a bow, speaking",
    description:
      "The index and middle fingers and the thumb are brought together so their tips touch, while the ring and little fingers are raised and held apart.",
    fingers: "Index, middle, thumb touching; ring and pinky raised",
    visualCharacteristic: "Pinching shape with two fingers raised behind it",
    features: {
      index_extended: false,
      index_bent: true,
      middle_extended: false,
      middle_bent: true,
      ring_extended: true,
      pinky_extended: true,
    },
    usedFor: ["Picking flowers", "Holding a garland", "Drawing a bow", "Speech"],
    difficulty: "Hard",
  },
  {
    id: 13,
    name: "Soochi",
    englishName: "Needle",
    meaning: "The number one hundred, the sun, the soul, a city",
    description:
      "The hand forms a loose fist with the thumb pressed against the middle finger, while the index finger alone points straight up.",
    fingers: "Index pointing straight up; rest of fingers curled, thumb on middle finger",
    visualCharacteristic: "Single raised index finger from a closed hand",
    features: {
      index_extended: true,
      middle_extended: false,
      ring_extended: false,
      pinky_extended: false,
      thumb_extended: false,
    },
    usedFor: ["Number one", "The sun", "The soul", "A city"],
    difficulty: "Medium",
  },
  {
    id: 14,
    name: "Chandrakala",
    englishName: "Digit of the Moon",
    meaning: "The crescent moon, the night sky",
    description:
      "From Soochi, the thumb is released and held straight out alongside the raised index finger, forming a crescent shape between them.",
    fingers: "Index and thumb both extended; middle, ring, pinky curled",
    visualCharacteristic: "Index finger and thumb forming a narrow crescent",
    features: {
      index_extended: true,
      thumb_extended: true,
      middle_extended: false,
      ring_extended: false,
      pinky_extended: false,
    },
    usedFor: ["Crescent moon", "Night sky", "Slim object"],
    difficulty: "Medium",
  },
  {
    id: 15,
    name: "Padmakosha",
    englishName: "Lotus Bud",
    meaning: "A lotus bud, fruit, the bosom",
    description:
      "All five fingers, including the thumb, are spread apart from one another with their tips slightly curved inward, cupping like the petals of an unopened lotus.",
    fingers: "All fingers spread apart with curved fingertips",
    visualCharacteristic: "Cupped hand with separated, slightly bent fingers",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      fingers_widely_spread: true,
      hand_open: true,
    },
    usedFor: ["Lotus bud", "Fruit", "Beauty"],
    difficulty: "Medium",
  },
  {
    id: 16,
    name: "Sarpasirsha",
    englishName: "Snake's Head",
    meaning: "A snake's hood, offering water, the movement of the earth",
    description:
      "All fingers, including the thumb, are held close together and curved slightly toward the palm so the hand forms a shallow, hood-like cup.",
    fingers: "All fingers together and gently curved toward the palm",
    visualCharacteristic: "Flattened, slightly cupped hand, fingers touching",
    features: {
      index_extended: true,
      index_bent: true,
      middle_extended: true,
      middle_bent: true,
      ring_bent: true,
      pinky_bent: true,
      fingers_together: true,
    },
    usedFor: ["Snake's hood", "Offering water", "Movement of the earth"],
    difficulty: "Hard",
  },
  {
    id: 17,
    name: "Mrigasirsha",
    englishName: "Deer's Head",
    meaning: "A woman, calling someone, a deer's head, the cheek",
    description:
      "From Sarpasirsha, the index, middle, and ring fingers bend forward together while the thumb and little finger are raised upward on either side.",
    fingers: "Thumb and pinky raised; index, middle, ring bent forward",
    visualCharacteristic: "Two raised outer digits with three curled inward",
    features: {
      thumb_extended: true,
      pinky_extended: true,
      index_extended: false,
      index_bent: true,
      middle_extended: false,
      ring_extended: false,
    },
    usedFor: ["Calling someone", "A woman", "Deer's head", "Cheek"],
    difficulty: "Hard",
  },
  {
    id: 18,
    name: "Simhamukha",
    englishName: "Lion's Face",
    meaning: "A lion, the heart, a pearl, incense, medicine",
    description:
      "The middle and ring fingers curl in to touch the thumb, while the index and little fingers remain extended and separated.",
    fingers: "Index and pinky extended; middle and ring touch thumb",
    visualCharacteristic: "Two outer fingers extended, two inner fingers curled to thumb",
    features: {
      index_extended: true,
      pinky_extended: true,
      middle_extended: false,
      middle_bent: true,
      ring_extended: false,
      ring_bent: true,
    },
    usedFor: ["Lion", "The heart", "A pearl", "Medicine/incense"],
    difficulty: "Hard",
  },
  {
    id: 19,
    name: "Kangoola",
    englishName: "Small Bell",
    meaning: "A bud, a small bell, a bell-shaped flower",
    description:
      "Starting from Padmakosha, only the ring finger is bent inward into the palm while the rest of the fingers stay extended and spread apart.",
    fingers: "Index, middle, pinky extended; ring finger bent",
    visualCharacteristic: "Spread hand with just the ring finger folded in",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: false,
      ring_bent: true,
      pinky_extended: true,
    },
    usedFor: ["Small bell", "Bud", "Bell-shaped flower"],
    difficulty: "Medium",
  },
  {
    id: 20,
    name: "Alapadma",
    englishName: "Fully Bloomed Lotus",
    meaning: "A full-bloomed lotus, the face, the moon, beauty",
    description:
      "All five fingers, including the thumb, are spread out wide and curved slightly backward, starting from the little finger, like a flower in full bloom.",
    fingers: "All fingers spread wide and curved back, led by the little finger",
    visualCharacteristic: "Wide open hand resembling a blooming flower",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      thumb_extended: true,
      fingers_widely_spread: true,
    },
    usedFor: ["Full-bloomed lotus", "Face", "Moon", "Beauty"],
    difficulty: "Medium",
  },
  {
    id: 21,
    name: "Chatura",
    englishName: "Square / Clever",
    meaning: "Cleverness, gold, musk, a small amount",
    description:
      "From Mrigasirsha, the thumb is brought to rest at the base of the index, middle, and ring fingers, which stay extended together, while the little finger folds down.",
    fingers: "Index, middle, ring extended together; pinky folded; thumb tucked at their base",
    visualCharacteristic: "Three fingers held flat together, like a small square",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: false,
      pinky_bent: true,
    },
    usedFor: ["Cleverness", "Gold", "Musk", "Small amount"],
    difficulty: "Hard",
  },
  {
    id: 22,
    name: "Bramara",
    englishName: "Bee",
    meaning: "A bee, a bird's wing, an earring",
    description:
      "The middle finger and thumb touch each other while the index finger curls in between them; the ring and little fingers stay raised and separated.",
    fingers: "Middle touches thumb, index curled between them; ring and pinky raised",
    visualCharacteristic: "Pinched middle finger and thumb with the index tucked in front",
    features: {
      middle_extended: false,
      middle_bent: true,
      index_extended: false,
      index_bent: true,
      ring_extended: true,
      pinky_extended: true,
    },
    usedFor: ["Bee", "Bird's wing", "Earring"],
    difficulty: "Hard",
  },
  {
    id: 23,
    name: "Hamsasya",
    englishName: "Swan's Bill",
    meaning: "Tying a knot, softness, holding a garland, the sacred thread",
    description:
      "The tip of the index finger touches the tip of the thumb to form a point like a swan's bill, while the middle, ring, and little fingers stay straight and separated.",
    fingers: "Index touches thumb tip; middle, ring, pinky extended",
    visualCharacteristic: "Pinched index and thumb with three fingers fanned out",
    features: {
      index_extended: false,
      index_bent: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      thumb_distance: 0.03,
    },
    usedFor: ["Tying", "Softness", "Holding a garland", "Sacred thread"],
    difficulty: "Medium",
  },
  {
    id: 24,
    name: "Hamsapaksha",
    englishName: "Swan's Wing",
    meaning: "A swan's wing, six, an oath, blessing",
    description:
      "Similar to Mrigasirsha, but here the thumb is bent down rather than raised, while the index, middle, and ring fingers stay together and the little finger is held apart.",
    fingers: "Index, middle, ring together; pinky separate; thumb bent down",
    visualCharacteristic: "Three joined fingers with the little finger and thumb set apart",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: true,
      thumb_extended: false,
      thumb_bent: true,
    },
    usedFor: ["Swan's wing", "Number six", "Oath", "Blessing"],
    difficulty: "Hard",
  },
  {
    id: 25,
    name: "Sandamsha",
    englishName: "Pincers / Tongs",
    meaning: "Plucking flowers, pulling, removing, a pincer grip",
    description:
      "The fingertips are drawn in toward the thumb tip one after another, like the pincer motion of tongs, just before closing fully into Mukula.",
    fingers: "Fingertips drawn toward the thumb in a pincer-like curl",
    visualCharacteristic: "Hand mid-way between open and a closed bud",
    features: {
      index_bent: true,
      middle_bent: true,
      ring_bent: true,
      pinky_extended: true,
      fingers_slightly_spread: true,
    },
    usedFor: ["Plucking flowers", "Pulling", "Removing an object"],
    difficulty: "Hard",
  },
  {
    id: 26,
    name: "Mukula",
    englishName: "Flower Bud",
    meaning: "A lotus bud, eating, offering to deities, a seal",
    description:
      "The fingertips of the thumb, middle, ring, and little fingers are drawn together to a single point, with the index curling in close beside them, like a closed flower bud.",
    fingers: "All fingertips drawn together to a point",
    visualCharacteristic: "Closed, pinched hand resembling an unopened bud",
    features: {
      index_bent: true,
      middle_bent: true,
      ring_bent: true,
      pinky_bent: true,
      fingers_together: true,
    },
    usedFor: ["Lotus bud", "Eating", "Offering to deities", "A seal"],
    difficulty: "Easy",
  },
  {
    id: 27,
    name: "Tamrachuda",
    englishName: "Rooster's Comb",
    meaning: "A rooster, a crow, a camel, writing",
    description:
      "The middle finger crosses over to touch the thumb, the index finger stays bent, and the ring and little fingers are pressed flat into the palm.",
    fingers: "Middle touches thumb; index bent; ring and pinky pressed into palm",
    visualCharacteristic: "Curled hand with one finger crossing toward the thumb",
    features: {
      middle_extended: false,
      middle_bent: true,
      index_extended: false,
      index_bent: true,
      ring_extended: false,
      pinky_extended: false,
    },
    usedFor: ["Rooster", "Crow", "Camel", "Writing"],
    difficulty: "Hard",
  },
  {
    id: 28,
    name: "Trishoola",
    englishName: "Trident",
    meaning: "Lord Shiva's trident, the three worlds, the three guṇas",
    description:
      "The index, middle, and ring fingers are held upright and slightly apart like the three prongs of a trident, while the little finger and thumb fold down.",
    fingers: "Index, middle, ring upright and separated; pinky and thumb folded",
    visualCharacteristic: "Three upright fingers resembling a trident",
    features: {
      index_extended: true,
      middle_extended: true,
      ring_extended: true,
      pinky_extended: false,
      thumb_extended: false,
      fingers_slightly_spread: true,
    },
    usedFor: ["Trident", "Lord Shiva", "The three worlds"],
    difficulty: "Medium",
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
    m.usedFor.some((use) => use.toLowerCase().includes(meaning.toLowerCase()))
  );
}