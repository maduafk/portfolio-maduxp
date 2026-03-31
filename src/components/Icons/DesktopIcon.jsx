import { useState, useRef, useCallback } from 'react';
import styles from './DesktopIcon.module.css';

const DRAG_THRESHOLD_PX = 5;

export default function DesktopIcon({
  icon,
  label,
  onDoubleClick,
  position,
  onDrag,
}) {
  const [selected, setSelected] = useState(false);
  const dragRef = useRef({
    dragging: false,
    startClientX: 0,
    startClientY: 0,
    originX: 0,
    originY: 0,
    maxDelta: 0,
  });
  const lastGestureHadDrag = useRef(false);
  const prevGestureHadDrag = useRef(false);

  const handleDoubleClick = useCallback(
    (e) => {
      if (lastGestureHadDrag.current || prevGestureHadDrag.current) {
        e.preventDefault();
        return;
      }
      onDoubleClick?.();
    },
    [onDoubleClick]
  );

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setSelected(true);
    dragRef.current = {
      dragging: true,
      startClientX: e.clientX,
      startClientY: e.clientY,
      originX: position.x,
      originY: position.y,
      maxDelta: 0,
    };

    const handleMouseMove = (ev) => {
      if (!dragRef.current.dragging) return;
      const dx = ev.clientX - dragRef.current.startClientX;
      const dy = ev.clientY - dragRef.current.startClientY;
      const dist = Math.hypot(dx, dy);
      dragRef.current.maxDelta = Math.max(dragRef.current.maxDelta, dist);
      onDrag?.(dragRef.current.originX + dx, dragRef.current.originY + dy);
    };

    const handleMouseUp = () => {
      dragRef.current.dragging = false;
      const wasDrag = dragRef.current.maxDelta > DRAG_THRESHOLD_PX;
      prevGestureHadDrag.current = lastGestureHadDrag.current;
      lastGestureHadDrag.current = wasDrag;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`${styles.icon} ${selected ? styles.selected : ''}`}
      style={{
        left: position.x,
        top: position.y,
      }}
      onDoubleClick={handleDoubleClick}
      onClick={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      onMouseDown={handleMouseDown}
      tabIndex={0}
    >
      <div className={styles.iconImage}>
        {icon}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
