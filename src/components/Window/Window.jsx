import { useRef, useCallback, useEffect, useState } from 'react';
import { useWindowManager } from '../../hooks/useWindowManager';
import styles from './Window.module.css';

export default function Window({ id, title, icon, children, zIndex, position, size, minimized, maximized }) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition } = useWindowManager();
  const windowRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [playMinimize, setPlayMinimize] = useState(false);
  const prevMinimizedRef = useRef(false);
  const TASKBAR_HEIGHT = 36;

  useEffect(() => {
    const timer = setTimeout(() => setIsOpening(false), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cleanup;
    if (minimized && !prevMinimizedRef.current) {
      setPlayMinimize(true);
      const t = setTimeout(() => setPlayMinimize(false), 200);
      cleanup = () => clearTimeout(t);
    }
    prevMinimizedRef.current = minimized;
    return cleanup;
  }, [minimized]);

  const handleMouseDown = useCallback((e) => {
    if (maximized) return;
    e.preventDefault();
    focusWindow(id);
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };

    const handleMouseMove = (e) => {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      updateWindowPosition(id, {
        x: dragRef.current.startPosX + dx,
        y: Math.max(0, dragRef.current.startPosY + dy),
      });
    };

    const handleMouseUp = () => {
      dragRef.current.dragging = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [id, position, maximized, focusWindow, updateWindowPosition]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => closeWindow(id), 120);
  };

  if (minimized && !playMinimize) return null;

  const windowStyle = maximized
    ? { top: 0, left: 0, width: '100%', height: `calc(100% - ${TASKBAR_HEIGHT}px)`, zIndex }
    : { top: position.y, left: position.x, width: size.width, height: size.height, zIndex };

  const animClass = isClosing
    ? styles.closing
    : isOpening
      ? styles.opening
      : playMinimize
        ? styles.minimizing
        : '';

  return (
    <div
      ref={windowRef}
      className={`window ${styles.windowPos} ${maximized ? styles.maximized : ''} ${animClass}`}
      style={windowStyle}
      onMouseDown={() => focusWindow(id)}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
          />
          <button
            aria-label={maximized ? "Restore" : "Maximize"}
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
          />
          <button
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
          />
        </div>
      </div>
      <div className="window-body" style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
