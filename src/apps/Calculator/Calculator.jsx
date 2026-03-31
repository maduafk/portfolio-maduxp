import { useState } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [reset, setReset] = useState(false);

  const handleNumber = (n) => {
    if (reset) { setDisplay(n); setReset(false); }
    else { setDisplay(display === '0' ? n : display + n); }
  };

  const handleOp = (o) => {
    setPrev(parseFloat(display));
    setOp(o);
    setReset(true);
  };

  const handleEquals = () => {
    if (prev === null || !op) return;
    const current = parseFloat(display);
    let result;
    switch (op) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/': result = current !== 0 ? prev / current : 'Erro'; break;
      default: return;
    }
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setReset(true);
  };

  const clear = () => { setDisplay('0'); setPrev(null); setOp(null); };
  const backspace = () => setDisplay(display.length > 1 ? display.slice(0, -1) : '0');

  const buttons = [
    ['MC', '7', '8', '9', '÷', '←'],
    ['MR', '4', '5', '6', '×', 'CE'],
    ['MS', '1', '2', '3', '-', 'C'],
    ['M+', '0', '.', '±', '+', '='],
  ];

  const handleClick = (btn) => {
    if ('0123456789'.includes(btn)) handleNumber(btn);
    else if (btn === '.') { if (!display.includes('.')) setDisplay(display + '.'); }
    else if (btn === '+') handleOp('+');
    else if (btn === '-') handleOp('-');
    else if (btn === '×') handleOp('*');
    else if (btn === '÷') handleOp('/');
    else if (btn === '=') handleEquals();
    else if (btn === 'C') clear();
    else if (btn === 'CE') setDisplay('0');
    else if (btn === '←') backspace();
    else if (btn === '±') setDisplay(String(-parseFloat(display)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>Exibir</span>
        <span className={styles.menuItem}>Editar</span>
        <span className={styles.menuItem}>Ajuda</span>
      </div>
      <div className={styles.display}>{display}</div>
      <div className={styles.grid}>
        {buttons.map((row, ri) => (
          row.map((btn, ci) => (
            <button
              key={`${ri}-${ci}`}
              className={`${styles.btn} ${
                btn === '=' ? styles.equalsBtn :
                '0123456789.'.includes(btn) ? styles.numBtn :
                styles.opBtn
              }`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))
        ))}
      </div>
    </div>
  );
}
