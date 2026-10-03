import { useEffect, useState } from 'react';
import styles from './MobileWarning.module.css';

const PHONE_SHORT_SIDE = 540;

function readLayout() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const shortSide = Math.min(width, height);
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const touch = navigator.maxTouchPoints > 0;
  return {
    handheld: (coarse || touch) && shortSide <= PHONE_SHORT_SIDE,
    portrait: height > width,
  };
}

export default function MobileWarning() {
  const [layout, setLayout] = useState({ handheld: false, portrait: false });
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const update = () => setLayout(readLayout());
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  if (!layout.handheld) return null;
  if (accepted && !layout.portrait) return null;

  if (accepted) {
    return (
      <div className={styles.overlay}>
        <div className={styles.window}>
          <div className={styles.icon} aria-hidden="true">📱</div>
          <h2 className={styles.title}>Deixa o celular deitado</h2>
          <p className={styles.text}>
            A tentativa no celular só roda com a tela na horizontal.
            Gira o aparelho e o Windows abre.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <div className={styles.icon} aria-hidden="true">🖥️</div>
        <h2 className={styles.title}>No celular fica ruim</h2>
        <p className={styles.text}>
          Esse portfólio foi feito para computador, como o Windows XP.
          No celular os ícones e as janelas ficam apertados, e algumas coisas podem falhar.
        </p>
        <p className={styles.hint}>
          Se quiser tentar mesmo assim, use o celular na horizontal.
        </p>
        <button type="button" className={styles.tryBtn} onClick={() => setAccepted(true)}>
          Quero tentar mesmo assim
        </button>
        <div className={styles.footer}>
          <span>No PC ou notebook a experiência é a certa.</span>
        </div>
      </div>
    </div>
  );
}
