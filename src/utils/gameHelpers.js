import { COLS, ROWS, SHAPES, SHAPE_NAMES, TEXT_BLOCKS } from './constants';

// Create empty grid
export const createEmptyGrid = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
};

// Get random text block
export const getRandomTextBlock = () => {
  const randomBlock = TEXT_BLOCKS[Math.floor(Math.random() * TEXT_BLOCKS.length)];
  return {
    text: randomBlock.text,
    width: randomBlock.width,
    color: randomBlock.color,
    x: Math.floor((COLS - randomBlock.width) / 2),
    y: 0
  };
};

// Get random Tetris shape
export const getRandomShape = () => {
  const shapeName = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
  const shapeData = SHAPES[shapeName];
  return {
    shape: shapeData.shape,
    color: shapeData.color,
    x: Math.floor((COLS - shapeData.shape[0].length) / 2),
    y: 0
  };
};

// Check if position is valid
export const isValidPosition = (grid, piece, x, y) => {
  if (piece.shape) {
    // Classic Tetris piece
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const newX = x + col;
          const newY = y + row;

          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && grid[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
  } else {
    // Text block
    for (let col = 0; col < piece.width; col++) {
      const newX = x + col;
      const newY = y;

      if (
        newX < 0 ||
        newX >= COLS ||
        newY >= ROWS ||
        (newY >= 0 && grid[newY][newX])
      ) {
        return false;
      }
    }
  }

  return true;
};

// Rotate shape
export const rotateShape = (shape) => {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      rotated[col][rows - 1 - row] = shape[row][col];
    }
  }

  return rotated;
};

// Merge piece into grid
export const mergePieceToGrid = (grid, piece) => {
  const newGrid = grid.map(row => [...row]);

  if (piece.shape) {
    // Classic Tetris piece
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const newY = piece.y + row;
          const newX = piece.x + col;
          if (newY >= 0 && newY < ROWS && newX >= 0 && newX < COLS) {
            newGrid[newY][newX] = { color: piece.color, text: '' };
          }
        }
      }
    }
  } else {
    // Text block
    for (let col = 0; col < piece.width; col++) {
      const newX = piece.x + col;
      const newY = piece.y;
      if (newY >= 0 && newY < ROWS && newX >= 0 && newX < COLS) {
        newGrid[newY][newX] = {
          color: piece.color,
          text: piece.text,
          isStart: col === 0,
          width: piece.width
        };
      }
    }
  }

  return newGrid;
};

// Clear completed lines
export const clearLines = (grid) => {
  let linesCleared = 0;
  const newGrid = [];

  for (let row = ROWS - 1; row >= 0; row--) {
    if (grid[row].every(cell => cell !== null)) {
      linesCleared++;
    } else {
      newGrid.unshift(grid[row]);
    }
  }

  while (newGrid.length < ROWS) {
    newGrid.unshift(Array(COLS).fill(null));
  }

  return { grid: newGrid, linesCleared };
};

// Check if game is over
export const isGameOver = (grid) => {
  return grid[0].some(cell => cell !== null);
};
