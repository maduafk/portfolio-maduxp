import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useWindowManager } from '../../hooks/useWindowManager';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';
import ContextMenu from '../ContextMenu/ContextMenu';
import DesktopIcon from '../Icons/DesktopIcon';
import Clippy from '../Clippy/Clippy';
import StickyNotes from '../StickyNotes/StickyNotes';
import WinRARPopup from '../WinRARPopup/WinRARPopup';
import { RecycleBinProvider } from '../../context/RecycleBinContext';
import { appRegistry } from '../../apps/registry';
import styles from './Desktop.module.css';

const virusMessages = [
  { title: 'Erro de Aplicativo — ERROR.EXE', msg: 'Referência a objeto não definido como uma instância de objeto.' },
  { title: 'Erro de Aplicativo — ERROR.EXE', msg: 'Este programa executou uma operação ilegal e será encerrado.' },
  { title: 'Erro Fatal — SYSTEM32', msg: 'O Windows encontrou um erro crítico e precisa ser reiniciado.' },
  { title: 'Erro — EXPLORER.EXE', msg: 'Não foi possível carregar a área de trabalho. Memória insuficiente.' },
  { title: 'Erro de Sistema', msg: 'O disco rígido está sendo formatado... Brincadeira! Ou não...' },
  { title: 'Erro Crítico — KERNEL32.DLL', msg: 'Falha catastrófica no sistema. Todos os dados serão perdidos.' },
];

function VirusDialog({ dialog, onOk, style }) {
  return (
    <div className={styles.virusDialog} style={style}>
      <div className={styles.virusDialogTitlebar}>
        <span>⚠️ {dialog.title}</span>
        <button type="button" className={styles.virusDialogClose}>✕</button>
      </div>
      <div className={styles.virusDialogBody}>
        <span className={styles.virusDialogIcon}>⛔</span>
        <p>{dialog.msg}</p>
      </div>
      <div className={styles.virusDialogButtons}>
        <button type="button" onClick={onOk}>OK</button>
        <button type="button" onClick={onOk}>Cancelar</button>
      </div>
    </div>
  );
}

const desktopApps = [
  'chrome', 'wordpad', 'mediaplayer', 'about', 'explorer',
  'notepad', 'virusbat', 'msn', 'paint', 'skills',
  'minesweeper', 'doom', 'limewire', 'contact', 'terminal',
  'recyclebin',
];

const ICON_W = 76;
const ICON_H = 76;

function computeInitialIconPositions(appIds) {
  if (typeof window === 'undefined') return {};
  const cols = Math.max(1, Math.floor((window.innerHeight - 40) / ICON_H));
  const positions = {};
  appIds.forEach((id, i) => {
    positions[id] = {
      x: Math.floor(i / cols) * ICON_W,
      y: (i % cols) * ICON_H,
    };
  });
  return positions;
}

export default function Desktop({ onShutdown, onBsod }) {
  const { windows, openWindow } = useWindowManager();
  const [showWinrar, setShowWinrar] = useState(false);
  const [showClippy, setShowClippy] = useState(true);
  const [iconPositions, setIconPositions] = useState(() =>
    computeInitialIconPositions(desktopApps)
  );
  const [deletedItems, setDeletedItems] = useState([]);
  const [virusStep, setVirusStep] = useState(-1);
  const [virusDialogs, setVirusDialogs] = useState([]);
  const [glitch, setGlitch] = useState(false);
  const virusTimer = useRef(null);
  const errorSound = useRef(new Audio('/sounds/error-sound.mp3'));

  const recycleBinContextValue = useMemo(
    () => ({
      deletedItems,
      setDeletedItems,
      emptyTrash: () => setDeletedItems([]),
    }),
    [deletedItems]
  );

  const playErrorSound = useCallback(() => {
    const s = errorSound.current;
    s.currentTime = 0;
    s.play().catch(() => {});
  }, []);

  const startVirus = useCallback(() => {
    setVirusStep(0);
    setVirusDialogs([{ ...virusMessages[0], id: 0, x: 120, y: 80 }]);
    playErrorSound();
  }, [playErrorSound]);

  const handleVirusOk = useCallback(() => {
    setVirusStep((prev) => {
      const next = prev + 1;
      if (next < virusMessages.length) {
        setVirusDialogs((d) => [
          ...d,
          {
            ...virusMessages[next],
            id: next,
            x: 120 + next * 30 + Math.random() * 40,
            y: 80 + next * 25 + Math.random() * 30,
          },
        ]);
        playErrorSound();
        return next;
      }
      setGlitch(true);
      virusTimer.current = setTimeout(() => {
        setGlitch(false);
        setVirusDialogs([]);
        setVirusStep(-1);
        onBsod?.();
      }, 2000);
      return next;
    });
  }, [onBsod]);

  useEffect(() => {
    return () => { if (virusTimer.current) clearTimeout(virusTimer.current); };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowWinrar(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const notepadApp = appRegistry.find(a => a.id === 'notepad');
    if (notepadApp) {
      openWindow(notepadApp.id, notepadApp.title, notepadApp.icon, notepadApp.component, notepadApp.defaultSize);
    }
  }, []);

  const handleIconDrag = useCallback((appId, x, y) => {
    setIconPositions((prev) => ({
      ...prev,
      [appId]: { x, y },
    }));
  }, []);

  const handleOpenApp = (appId) => {
    if (appId === 'virusbat') {
      startVirus();
      return;
    }
    const app = appRegistry.find(a => a.id === appId);
    if (app) {
      openWindow(app.id, app.title, app.icon, app.component, app.defaultSize);
    }
  };

  const icons = appRegistry.filter(a => desktopApps.includes(a.id));

  return (
    <RecycleBinProvider value={recycleBinContextValue}>
      <div className={`${styles.desktop} ${glitch ? styles.glitch : ''}`}>
        {icons.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            position={iconPositions[app.id] ?? { x: 0, y: 0 }}
            onDrag={(x, y) => handleIconDrag(app.id, x, y)}
            onDoubleClick={() => handleOpenApp(app.id)}
          />
        ))}

        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            zIndex={win.zIndex}
            position={win.position}
            size={win.size}
            minimized={win.minimized}
            maximized={win.maximized}
          >
            {win.component}
          </Window>
        ))}

        {showWinrar && <WinRARPopup onClose={() => setShowWinrar(false)} />}
        {showClippy && <Clippy onClose={() => setShowClippy(false)} />}
        <StickyNotes />

        {virusDialogs.map((d) => (
          <VirusDialog
            key={d.id}
            dialog={d}
            onOk={handleVirusOk}
            style={{ left: d.x, top: d.y, zIndex: 90000 + d.id }}
          />
        ))}
        <ContextMenu />
        <Taskbar onOpenApp={handleOpenApp} onShutdown={onShutdown} />
      </div>
    </RecycleBinProvider>
  );
}
