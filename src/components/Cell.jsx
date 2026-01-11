import { motion } from 'framer-motion';
import './Cell.css';

const Cell = ({ cell, isActive, piece, isPreview }) => {
  const hasContent = cell || isActive;
  const color = isActive ? piece?.color : cell?.color;
  const text = isActive ? piece?.text : cell?.text;
  const isStart = isActive ? piece?.isStart : cell?.isStart;
  const width = isActive ? piece?.width : cell?.width;

  return (
    <motion.div
      className={`cell ${hasContent ? 'filled' : ''} ${isPreview ? 'preview' : ''}`}
      style={{
        backgroundColor: hasContent ? color : 'transparent',
        borderColor: hasContent ? color : 'var(--grid-color)'
      }}
      initial={hasContent && !isPreview ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {text && isStart && (
        <motion.div
          className="cell-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: `${width * 100}%`,
            fontSize: width > 2 ? '8px' : '10px'
          }}
        >
          {text}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cell;
