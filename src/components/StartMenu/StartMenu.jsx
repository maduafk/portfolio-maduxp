import { useEffect, useRef, useState } from 'react';
import { appRegistry } from '../../apps/registry';
import styles from './StartMenu.module.css';

const pinnedApps = ['chrome', 'contact', 'mediaplayer', 'msn', 'explorer'];
const allProgramsApps = ['chrome', 'contact', 'msn', 'notepad-empty', 'paint', 'mediaplayer', 'calculator', 'minesweeper', 'doom', 'limewire', 'terminal', 'wordpad'];

export default function StartMenu({ onOpenApp, onClose, onShutdown }) {
  const menuRef = useRef(null);
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        const startBtn = document.querySelector('[class*="startButton"]');
        if (startBtn && startBtn.contains(e.target)) return;
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const pinned = appRegistry.filter(a => pinnedApps.includes(a.id));
  const allProgs = appRegistry.filter(a => allProgramsApps.includes(a.id));

  const rightItems = [
    { id: 'explorer', label: 'Meus Documentos', bold: true },
    { id: 'explorer', label: 'Documentos Recentes' },
    { id: 'paint', label: 'Minhas Imagens' },
    { id: 'mediaplayer', label: 'Minhas Músicas' },
    { id: 'about', label: 'Meu Computador', bold: true },
    null,
    { id: 'skills', label: 'Painel de Controle' },
    null,
    { id: 'terminal', label: 'Prompt de Comando' },
  ];

  const open = (id) => { onOpenApp(id); onClose(); };

  return (
    <div className={styles.menu} ref={menuRef}>
      <div className={styles.header}>
        <img src="/assets/user-photo.png" alt="" className={styles.avatar} draggable={false} />
        <span className={styles.headerName}>madugamer0412</span>
      </div>

      <div className={styles.body}>
        <div className={styles.leftCol}>
          {!showAllPrograms ? (
            <>
              {pinned.map((app) => (
                <button key={app.id} className={styles.item} onClick={() => open(app.id)}>
                  <div className={styles.itemIcon}>{app.icon}</div>
                  <div className={styles.itemText}>
                    <span className={styles.itemTitle}>{app.label}</span>
                    <span className={styles.itemDesc}>{app.description}</span>
                  </div>
                </button>
              ))}
              <div className={styles.sep} />
              <button className={styles.allProgramsBtn} onClick={() => setShowAllPrograms(true)}>
                <span>Todos os Programas</span>
                <svg viewBox="0 0 12 12" width="14" height="14" className={styles.greenArrow}>
                  <polygon points="2,0 10,6 2,12" fill="#3C8B38"/>
                </svg>
              </button>
            </>
          ) : (
            <>
              <button className={styles.allProgramsBtn} onClick={() => setShowAllPrograms(false)}>
                <svg viewBox="0 0 12 12" width="14" height="14" className={styles.greenArrow} style={{transform:'rotate(180deg)'}}>
                  <polygon points="2,0 10,6 2,12" fill="#3C8B38"/>
                </svg>
                <span>Voltar</span>
              </button>
              <div className={styles.sep} />
              {allProgs.map((app) => (
                <button key={app.id} className={styles.item} onClick={() => open(app.id)}>
                  <div className={styles.itemIconSm}>{app.icon}</div>
                  <div className={styles.itemText}>
                    <span className={styles.itemTitle}>{app.label}</span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>

        <div className={styles.rightCol}>
          {rightItems.map((item, i) => item === null ? (
            <div key={i} className={styles.rightSep} />
          ) : (
            <button
              key={i}
              className={`${styles.rightItem} ${item.bold ? styles.rightBold : ''}`}
              onClick={() => open(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.footerBtn} onClick={onShutdown}>
          <svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="none" stroke="#FFF" strokeWidth="1.5"/><line x1="8" y1="2" x2="8" y2="8" stroke="#FFF" strokeWidth="1.5"/></svg>
          <span>Log Off</span>
        </button>
        <button className={styles.footerBtn} onClick={onShutdown}>
          <svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="#CC3300"/><rect x="7" y="2" width="2" height="6" rx="1" fill="#FFF"/><path d="M5,5 A4,4 0 1,0 11,5" stroke="#FFF" strokeWidth="1.5" fill="none"/></svg>
          <span>Desligar computador</span>
        </button>
      </div>
    </div>
  );
}
