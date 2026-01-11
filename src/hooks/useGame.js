import { useState, useEffect, useCallback, useRef } from 'react';
import {
  createEmptyGrid,
  getRandomTextBlock,
  isValidPosition,
  rotateShape,
  mergePieceToGrid,
  clearLines,
  isGameOver
} from '../utils/gameHelpers';
import { INITIAL_SPEED, MIN_SPEED, SPEED_INCREASE } from '../utils/constants';

export const useGame = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameLoopRef = useRef(null);
  const speedRef = useRef(INITIAL_SPEED);

  // Initialize game
  const initGame = useCallback(() => {
    setGrid(createEmptyGrid());
    setCurrentPiece(getRandomTextBlock());
    setNextPiece(getRandomTextBlock());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    speedRef.current = INITIAL_SPEED;
  }, []);

  // Move piece down
  const movePieceDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return false;

    const newY = currentPiece.y + 1;

    if (isValidPosition(grid, currentPiece, currentPiece.x, newY)) {
      setCurrentPiece({ ...currentPiece, y: newY });
      return true;
    } else {
      // Lock piece
      const newGrid = mergePieceToGrid(grid, currentPiece);
      const { grid: clearedGrid, linesCleared } = clearLines(newGrid);

      setGrid(clearedGrid);

      if (linesCleared > 0) {
        const newLines = lines + linesCleared;
        const newScore = score + linesCleared * 100 * level;
        const newLevel = Math.floor(newLines / 10) + 1;

        setLines(newLines);
        setScore(newScore);
        setLevel(newLevel);

        // Increase speed
        speedRef.current = Math.max(
          MIN_SPEED,
          INITIAL_SPEED - (newLevel - 1) * SPEED_INCREASE
        );
      }

      if (isGameOver(clearedGrid)) {
        setGameOver(true);
        return false;
      }

      setCurrentPiece(nextPiece);
      setNextPiece(getRandomTextBlock());
      return false;
    }
  }, [currentPiece, grid, gameOver, isPaused, lines, score, level, nextPiece]);

  // Move piece horizontally
  const movePiece = useCallback((dx) => {
    if (!currentPiece || gameOver || isPaused) return;

    const newX = currentPiece.x + dx;

    if (isValidPosition(grid, currentPiece, newX, currentPiece.y)) {
      setCurrentPiece({ ...currentPiece, x: newX });
    }
  }, [currentPiece, grid, gameOver, isPaused]);

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused || !currentPiece.shape) return;

    const rotated = rotateShape(currentPiece.shape);
    const rotatedPiece = { ...currentPiece, shape: rotated };

    if (isValidPosition(grid, rotatedPiece, currentPiece.x, currentPiece.y)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, grid, gameOver, isPaused]);

  // Drop piece instantly
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = currentPiece.y;
    while (isValidPosition(grid, currentPiece, currentPiece.x, newY + 1)) {
      newY++;
    }

    setCurrentPiece({ ...currentPiece, y: newY });
    // Let the next tick handle locking
    setTimeout(() => movePieceDown(), 50);
  }, [currentPiece, grid, gameOver, isPaused, movePieceDown]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (!gameStarted || gameOver) return;
    setIsPaused(prev => !prev);
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    gameLoopRef.current = setInterval(() => {
      movePieceDown();
    }, speedRef.current);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, isPaused, movePieceDown]);

  return {
    grid,
    currentPiece,
    nextPiece,
    score,
    level,
    lines,
    gameOver,
    isPaused,
    gameStarted,
    initGame,
    movePiece,
    rotatePiece,
    dropPiece,
    togglePause,
    movePieceDown
  };
};
