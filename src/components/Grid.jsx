import { motion } from 'framer-motion';
import Cell from './Cell';
import './Grid.css';

const Grid = ({ grid, currentPiece }) => {
  const renderCell = (cell, rowIndex, colIndex) => {
    let isActive = false;
    let activePiece = null;

    if (currentPiece) {
      if (currentPiece.shape) {
        // Classic Tetris piece
        for (let row = 0; row < currentPiece.shape.length; row++) {
          for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
              if (
                rowIndex === currentPiece.y + row &&
                colIndex === currentPiece.x + col
              ) {
                isActive = true;
                activePiece = {
                  color: currentPiece.color,
                  text: '',
                  isStart: false,
                  width: 1
                };
              }
            }
          }
        }
      } else {
        // Text block
        const isInRange =
          rowIndex === currentPiece.y &&
          colIndex >= currentPiece.x &&
          colIndex < currentPiece.x + currentPiece.width;

        if (isInRange) {
          isActive = true;
          activePiece = {
            color: currentPiece.color,
            text: currentPiece.text,
            isStart: colIndex === currentPiece.x,
            width: currentPiece.width
          };
        }
      }
    }

    return (
      <Cell
        key={`${rowIndex}-${colIndex}`}
        cell={cell}
        isActive={isActive}
        piece={activePiece}
      />
    );
  };

  return (
    <motion.div
      className="grid-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
        )}
      </div>
    </motion.div>
  );
};

export default Grid;
