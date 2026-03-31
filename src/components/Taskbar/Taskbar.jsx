import { useState, useEffect } from 'react';
import { useWindowManager } from '../../hooks/useWindowManager';
import StartMenu from '../StartMenu/StartMenu';
import styles from './Taskbar.module.css';

export default function Taskbar({ onOpenApp, onShutdown }) {
  const { windows, focusWindow } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleStartClick = () => setStartOpen(prev => !prev);
  const handleCloseStart = () => setStartOpen(false);

  return (
    <>
      {startOpen && (
        <StartMenu
          onOpenApp={onOpenApp}
          onClose={handleCloseStart}
          onShutdown={() => { handleCloseStart(); onShutdown?.(); }}
        />
      )}
      <div className={styles.taskbar}>
        <button
          className={`${styles.startButton} ${startOpen ? styles.startActive : ''}`}
          onClick={handleStartClick}
        >
          <img src="/assets/xp-flag-boot.png" alt="" className={styles.startLogo} draggable={false} />
          <span className={styles.startLabel}>start</span>
        </button>

        <div className={styles.taskList}>
          {windows.map((win) => (
            <button
              key={win.id}
              className={`${styles.taskItem} ${!win.minimized ? styles.taskActive : ''}`}
              onClick={() => focusWindow(win.id)}
              title={win.title}
            >
              <span className={styles.taskIcon}>{win.icon}</span>
              <span className={styles.taskTitle}>{win.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.systemTray}>
          <span className={styles.trayIcon}>🔊</span>
          <span className={styles.trayIcon}>🛡️</span>
          <span className={styles.clock}>{formattedTime}</span>
        </div>
      </div>
    </>
  );
}
