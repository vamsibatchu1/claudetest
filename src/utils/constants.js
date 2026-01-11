// Game configuration
export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

// Game speeds (milliseconds)
export const INITIAL_SPEED = 1000;
export const MIN_SPEED = 100;
export const SPEED_INCREASE = 50;

// Text content for blocks
export const TEXT_BLOCKS = [
  // Short phrases
  { text: "HELLO", width: 1, color: "var(--tetris-cyan)" },
  { text: "CODE", width: 1, color: "var(--tetris-yellow)" },
  { text: "REACT", width: 1, color: "var(--tetris-purple)" },
  { text: "PLAY", width: 1, color: "var(--tetris-green)" },

  // Medium phrases
  { text: "GAME ON", width: 2, color: "var(--tetris-red)" },
  { text: "LETS GO", width: 2, color: "var(--tetris-blue)" },
  { text: "NICE TRY", width: 2, color: "var(--tetris-orange)" },
  { text: "KEEP UP", width: 2, color: "var(--tetris-cyan)" },

  // Longer phrases
  { text: "GOOD WORK", width: 3, color: "var(--tetris-yellow)" },
  { text: "STAY FOCUSED", width: 3, color: "var(--tetris-purple)" },
  { text: "ALMOST THERE", width: 3, color: "var(--tetris-green)" },

  // Extra long
  { text: "EXCELLENT MOVE", width: 4, color: "var(--tetris-red)" },
  { text: "KEEP IT GOING", width: 4, color: "var(--tetris-blue)" },
];

// Tetromino shapes (classic Tetris pieces)
export const SHAPES = {
  I: { shape: [[1, 1, 1, 1]], color: "var(--tetris-cyan)" },
  O: { shape: [[1, 1], [1, 1]], color: "var(--tetris-yellow)" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "var(--tetris-purple)" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "var(--tetris-green)" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "var(--tetris-red)" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "var(--tetris-blue)" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "var(--tetris-orange)" }
};

export const SHAPE_NAMES = Object.keys(SHAPES);
