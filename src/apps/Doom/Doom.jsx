import { useEffect, useRef, useState } from 'react';
import styles from './Doom.module.css';

const JSDOS_SRC = 'https://v8.js-dos.com/latest/js-dos.js';
const JSDOS_CSS = 'https://v8.js-dos.com/latest/js-dos.css';

let jsdosReady;

function loadJsDos() {
  if (window.Dos) return Promise.resolve();
  if (!jsdosReady) {
    jsdosReady = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-jsdos]')) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = JSDOS_CSS;
        css.dataset.jsdos = '1';
        document.head.appendChild(css);
      }
      const existing = document.querySelector('script[data-jsdos]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('js-dos')), { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = JSDOS_SRC;
      script.dataset.jsdos = '1';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('js-dos'));
      document.body.appendChild(script);
    });
  }
  return jsdosReady;
}

export default function Doom() {
  const playerRef = useRef(null);
  const [status, setStatus] = useState('Carregando DOOM...');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = playerRef.current;
    if (!el) return undefined;
    let player;
    let cancelled = false;

    loadJsDos()
      .then(() => {
        if (cancelled || !playerRef.current || !window.Dos) return;
        setStatus('');
        player = window.Dos(playerRef.current, {
          url: '/games/doom.jsdos',
          autoStart: true,
          kiosk: true,
          imageRendering: 'pixelated',
          theme: 'dark',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          setStatus('Não consegui carregar o DOOM. Confere a internet e abre de novo.');
        }
      });

    return () => {
      cancelled = true;
      player?.stop?.();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.stage}>
        <div ref={playerRef} className={styles.player} />
        {status ? <div className={styles.status}>{status}</div> : null}
      </div>
      <div className={styles.hint}>
        A demo começa sozinha. Aperta uma tecla para o menu. Setas movem · Ctrl atira · Espaço abre · Shift corre. Episódio 1, shareware.
      </div>
    </div>
  );
}
