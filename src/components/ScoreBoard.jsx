import { motion } from 'framer-motion';
import './ScoreBoard.css';

const ScoreBoard = ({ score, level, lines, nextPiece }) => {
  return (
    <motion.div
      className="scoreboard"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="score-section">
        <div className="stat-box">
          <div className="stat-label">SCORE</div>
          <motion.div
            className="stat-value"
            key={score}
            initial={{ scale: 1.2, color: 'var(--accent-color)' }}
            animate={{ scale: 1, color: 'var(--text-primary)' }}
            transition={{ duration: 0.2 }}
          >
            {score}
          </motion.div>
        </div>

        <div className="stat-box">
          <div className="stat-label">LEVEL</div>
          <div className="stat-value">{level}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">LINES</div>
          <div className="stat-value">{lines}</div>
        </div>
      </div>

      {nextPiece && (
        <div className="next-piece-section">
          <div className="stat-label">NEXT</div>
          <div className="next-piece-display">
            <motion.div
              className="next-piece-text"
              style={{ color: nextPiece.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              key={nextPiece.text}
              transition={{ duration: 0.3 }}
            >
              {nextPiece.text}
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ScoreBoard;
