import { useState, useRef, useCallback } from 'react';
import styles from './StickyNotes.module.css';

const initialNotes = [
  {
    id: 1,
    title: 'WIFI',
    content: 'Rede: VIANA_5G\nSenha: viana2002\n',
    color: '#FFFFAA',
    x: window.innerWidth - 200,
    y: 80,
  },
  {
    id: 2,
    title: 'Club Penguin',
    content: 'User: madugamer0412\nSenha: pinguim123\n\nNÃO PERDER ESSA CONTA\ntenho iglu decorado',
    color: '#AAFFAA',
    x: window.innerWidth - 210,
    y: 260,
  },
  {
    id: 3,
    title: 'NÃO ESQUECEEEER',
    content: '☐ Estudar pra prova de quinta\n☐ Baixar DOOM na torradeira nova\n☐ Colocar novas musicas no pendrive do pai\n☑ Criar portfolio massa\n☐ Dormir antes das 3h',
    color: '#DDAAFF',
    x: window.innerWidth - 220,
    y: 440,
  },
];

function DraggableNote({ note, onMove }) {
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, noteX: 0, noteY: 0 });

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      noteX: note.x,
      noteY: note.y,
    };

    const handleMouseMove = (e) => {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      onMove(note.id, dragRef.current.noteX + dx, dragRef.current.noteY + dy);
    };

    const handleMouseUp = () => {
      dragRef.current.dragging = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [note.id, note.x, note.y, onMove]);

  return (
    <div
      className={styles.note}
      style={{
        background: note.color,
        left: note.x,
        top: note.y,
      }}
    >
      <div className={styles.noteHeader} onMouseDown={handleMouseDown}>
        <span>{note.title}</span>
      </div>
      <pre className={styles.noteContent}>{note.content}</pre>
    </div>
  );
}

export default function StickyNotes() {
  const [notes, setNotes] = useState(initialNotes);

  const handleMove = useCallback((id, x, y) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  }, []);

  return (
    <>
      {notes.map((note) => (
        <DraggableNote key={note.id} note={note} onMove={handleMove} />
      ))}
    </>
  );
}
