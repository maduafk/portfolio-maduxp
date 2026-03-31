import { useState, useEffect } from 'react';
import styles from './Clippy.module.css';

const tips = [
  'Oi! Eu sou o Clippy! A Madu me pediu pra te ajudar por aqui',
  'Dica: dê dois cliques nos ícones do desktop pra abrir os apps!',
  'Sabia que a Madu já trabalhou com Java e APIs REST em sistema fiscal?',
  'Tente abrir o Prompt de Comando e digitar "about" ou "skills"!',
  'O MSN tem histórico de conversas! Vai lá conferir',
  'A Madu tá cursando Eng. de Software na Faculdade Alfredo Nasser!',
  'Abra o Paint e desenhe algo! Ou o Minesweeper pra relaxar',
  'Parece que você está explorando o portfolio. Quer uma dica? Clique com botão direito no desktop!',
];

export default function Clippy({ onClose }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.clippy}>
      <div className={styles.bubble}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <p className={styles.text}>{tips[tipIndex]}</p>
        <div className={styles.actions}>
          <button
            className={styles.btn}
            onClick={() => setTipIndex((tipIndex + 1) % tips.length)}
          >
            Próxima dica
          </button>
          <button className={styles.btn} onClick={onClose}>
            Dispensar
          </button>
        </div>
      </div>
      <div className={styles.character}>📎</div>
    </div>
  );
}
