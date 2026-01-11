import { motion } from 'framer-motion';
import './Controls.css';

const Controls = ({ onLeft, onRight, onRotate, onDrop, onPause, isPaused, gameStarted }) => {
  const buttonVariants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.05 }
  };

  return (
    <motion.div
      className="controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="controls-top">
        <motion.button
          className="control-btn pause-btn"
          onTouchStart={(e) => { e.preventDefault(); onPause(); }}
          onClick={onPause}
          variants={buttonVariants}
          whileTap="tap"
          whileHover="hover"
          disabled={!gameStarted}
        >
          {isPaused ? '▶' : '⏸'}
        </motion.button>

        <motion.button
          className="control-btn rotate-btn"
          onTouchStart={(e) => { e.preventDefault(); onRotate(); }}
          onClick={onRotate}
          variants={buttonVariants}
          whileTap="tap"
          whileHover="hover"
        >
          ↻
        </motion.button>
      </div>

      <div className="controls-bottom">
        <motion.button
          className="control-btn arrow-btn"
          onTouchStart={(e) => { e.preventDefault(); onLeft(); }}
          onClick={onLeft}
          variants={buttonVariants}
          whileTap="tap"
          whileHover="hover"
        >
          ←
        </motion.button>

        <motion.button
          className="control-btn drop-btn"
          onTouchStart={(e) => { e.preventDefault(); onDrop(); }}
          onClick={onDrop}
          variants={buttonVariants}
          whileTap="tap"
          whileHover="hover"
        >
          ↓
        </motion.button>

        <motion.button
          className="control-btn arrow-btn"
          onTouchStart={(e) => { e.preventDefault(); onRight(); }}
          onClick={onRight}
          variants={buttonVariants}
          whileTap="tap"
          whileHover="hover"
        >
          →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Controls;
