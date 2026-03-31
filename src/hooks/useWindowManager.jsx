import { createContext, useContext, useState, useCallback } from 'react';

const WindowManagerContext = createContext(null);

const DEFAULT_WINDOW_SIZE = { width: 600, height: 450 };

function getDefaultPosition(index) {
  const offset = (index % 8) * 30 + 60;
  return { x: offset + 40, y: offset };
}

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(10);

  const openWindow = useCallback((id, title, icon, component, size) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        return prev.map(w =>
          w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
        );
      }
      const position = getDefaultPosition(prev.length);
      return [...prev, {
        id,
        title,
        icon,
        component,
        position,
        size: size || { ...DEFAULT_WINDOW_SIZE },
        minimized: false,
        maximized: false,
        zIndex: nextZIndex,
      }];
    });
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, maximized: !w.maximized } : w
    ));
  }, []);

  const focusWindow = useCallback((id) => {
    setWindows(prev => {
      const win = prev.find(w => w.id === id);
      if (win && win.minimized) {
        return prev.map(w =>
          w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
        );
      }
      return prev.map(w =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      );
    });
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((id, position) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id, size) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, size } : w
    ));
  }, []);

  const value = {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
}
