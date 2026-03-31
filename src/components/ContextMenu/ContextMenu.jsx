import { useState, useEffect, useCallback } from 'react';
import styles from './ContextMenu.module.css';

export default function ContextMenu() {
  const [menu, setMenu] = useState(null);

  const handleContextMenu = useCallback((e) => {
    if (e.target.closest('.window') || e.target.closest('[class*="taskbar"]') || e.target.closest('[class*="icon"]') || e.target.closest('[class*="startMenu"]') || e.target.closest('[class*="note"]') || e.target.closest('[class*="clippy"]')) {
      return;
    }
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const close = useCallback(() => setMenu(null), []);

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', close);
    };
  }, [handleContextMenu, close]);

  if (!menu) return null;

  return (
    <div className={styles.menu} style={{ left: menu.x, top: menu.y }}>
      <div className={styles.item} onClick={() => { close(); window.location.reload(); }}>Atualizar</div>
      <div className={styles.item} onClick={close}>Organizar Ícones</div>
      <div className={styles.separator} />
      <div className={`${styles.item} ${styles.disabled}`}>Novo &nbsp;▸</div>
      <div className={styles.separator} />
      <div className={styles.item} onClick={() => { close(); alert('Propriedades de Exibição\n\nTema: Windows XP\nResolução: ' + window.innerWidth + 'x' + window.innerHeight + '\nPapel de parede: Bliss'); }}>Propriedades</div>
    </div>
  );
}
