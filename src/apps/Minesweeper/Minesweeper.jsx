import { useState, useCallback } from 'react';
import styles from './Minesweeper.module.css';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

function createBoard() {
  const board = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false, revealed: false, flagged: false, count: 0,
    }))
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) count++;
        }
      }
      board[r][c].count = count;
    }
  }
  return board;
}

function cloneBoard(board) {
  return board.map(row => row.map(cell => ({ ...cell })));
}

export default function Minesweeper() {
  const [board, setBoard] = useState(() => createBoard());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [face, setFace] = useState('🙂');

  const reveal = useCallback((b, r, c) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (b[r][c].revealed || b[r][c].flagged) return;
    b[r][c].revealed = true;
    if (b[r][c].count === 0 && !b[r][c].mine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          reveal(b, r + dr, c + dc);
    }
  }, []);

  const handleClick = (r, c) => {
    if (gameOver || won) return;
    const b = cloneBoard(board);
    if (b[r][c].mine) {
      b.forEach(row => row.forEach(cell => { if (cell.mine) cell.revealed = true; }));
      setBoard(b);
      setGameOver(true);
      setFace('😵');
      return;
    }
    reveal(b, r, c);
    const unrevealed = b.flat().filter(c => !c.revealed && !c.mine).length;
    if (unrevealed === 0) {
      setWon(true);
      setFace('😎');
    }
    setBoard(b);
  };

  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameOver || won) return;
    const b = cloneBoard(board);
    if (!b[r][c].revealed) {
      b[r][c].flagged = !b[r][c].flagged;
      setBoard(b);
    }
  };

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setFace('🙂');
  };

  const flagCount = board.flat().filter(c => c.flagged).length;
  const colors = ['', '#0000FF', '#008000', '#FF0000', '#000080', '#800000', '#008080', '#000', '#808080'];

  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <span className={styles.menuItem} onClick={reset}>Novo Jogo</span>
        <span className={styles.menuItem}>Ajuda</span>
      </div>
      <div className={styles.header}>
        <div className={styles.counter}>{String(MINES - flagCount).padStart(3, '0')}</div>
        <button className={styles.faceBtn} onClick={reset}>{face}</button>
        <div className={styles.counter}>000</div>
      </div>
      <div className={styles.board}>
        {board.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((cell, c) => (
              <button
                key={c}
                className={`${styles.cell} ${cell.revealed ? styles.revealed : ''}`}
                onClick={() => handleClick(r, c)}
                onContextMenu={(e) => handleRightClick(e, r, c)}
              >
                {cell.flagged && !cell.revealed ? '🚩' :
                 cell.revealed && cell.mine ? '💣' :
                 cell.revealed && cell.count > 0 ?
                   <span style={{ color: colors[cell.count], fontWeight: 'bold' }}>{cell.count}</span> :
                 ''}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
