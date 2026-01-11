import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../hooks/useGame';
import Grid from './Grid';
import ScoreBoard from './ScoreBoard';
import Controls from './Controls';
import './Game.css';

const Game = () => {
  const {
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
  } = useGame();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePieceDown();
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          rotatePiece();
          break;
        case 'Enter':
          e.preventDefault();
          dropPiece();
          break;
        case 'p':
        case 'P':
        case 'Escape':
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, movePiece, rotatePiece, dropPiece, togglePause, movePieceDown]);

  return (
    <div className="game">
      <motion.div
        className="game-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="game-title">TEXT TETRIS</h1>
        <p className="game-subtitle">Words fall, you arrange</p>
      </motion.div>

      {!gameStarted ? (
        <motion.div
          className="start-screen"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="start-content">
            <motion.div
              className="start-logo"
              animate={{
                textShadow: [
                  '0 0 20px rgba(0, 255, 136, 0.5)',
                  '0 0 40px rgba(0, 255, 136, 0.8)',
                  '0 0 20px rgba(0, 255, 136, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              TEXT
            </motion.div>
            <motion.button
              className="start-btn"
              onClick={initGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START GAME
            </motion.button>
            <div className="instructions">
              <p>• Arrange falling text blocks</p>
              <p>• Complete lines to score</p>
              <p>• Use arrow keys or touch controls</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="game-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ScoreBoard score={score} level={level} lines={lines} nextPiece={nextPiece} />
          <Grid grid={grid} currentPiece={currentPiece} />
          <Controls
            onLeft={() => movePiece(-1)}
            onRight={() => movePiece(1)}
            onRotate={rotatePiece}
            onDrop={dropPiece}
            onPause={togglePause}
            isPaused={isPaused}
            gameStarted={gameStarted}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {isPaused && gameStarted && !gameOver && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="overlay-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2>PAUSED</h2>
              <p>Press P or tap ▶ to continue</p>
            </motion.div>
          </motion.div>
        )}

        {gameOver && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="overlay-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <h2>GAME OVER</h2>
              <div className="final-score">
                <p>Final Score</p>
                <p className="score-number">{score}</p>
              </div>
              <motion.button
                className="start-btn"
                onClick={initGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PLAY AGAIN
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;
