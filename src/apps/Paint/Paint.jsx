import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './Paint.module.css';

const tools = ['✏️', '🖌️', '🪣', '⬜', '⭕', '📏'];
const colors = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF',
];

export default function Paint() {
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [drawing, setDrawing] = useState(false);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const startDraw = useCallback((e) => {
    setDrawing(true);
    const pos = getPos(e);
    lastPos.current = pos;

    if (selectedTool === 2) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = selectedColor;
    ctx.fill();
  }, [getPos, selectedColor, selectedTool, brushSize]);

  const draw = useCallback((e) => {
    if (!drawing) return;
    if (selectedTool === 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);

    if (selectedTool <= 1) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = selectedTool === 0 ? brushSize : brushSize * 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    lastPos.current = pos;
  }, [drawing, getPos, selectedColor, selectedTool, brushSize]);

  const stopDraw = useCallback((e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);

    if (selectedTool === 3) {
      const dx = pos.x - lastPos.current.x;
      const dy = pos.y - lastPos.current.y;
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.strokeRect(lastPos.current.x, lastPos.current.y, dx, dy);
    } else if (selectedTool === 4) {
      const cx = (lastPos.current.x + pos.x) / 2;
      const cy = (lastPos.current.y + pos.y) / 2;
      const rx = Math.abs(pos.x - lastPos.current.x) / 2;
      const ry = Math.abs(pos.y - lastPos.current.y) / 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.stroke();
    } else if (selectedTool === 5) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    setDrawing(false);
    lastPos.current = null;
  }, [drawing, getPos, selectedColor, selectedTool, brushSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>Arquivo</span>
        <span className={styles.menuItem}>Editar</span>
        <span className={styles.menuItem}>Exibir</span>
        <span className={styles.menuItem}>Imagem</span>
        <span className={styles.menuItem}>Cores</span>
        <span className={styles.menuItem} onClick={clearCanvas}>Limpar</span>
      </div>

      <div className={styles.workspace}>
        <div className={styles.toolbox}>
          {tools.map((tool, i) => (
            <button
              key={i}
              className={`${styles.toolBtn} ${selectedTool === i ? styles.toolActive : ''}`}
              onClick={() => setSelectedTool(i)}
            >
              {tool}
            </button>
          ))}
          <div className={styles.sizeControl}>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className={styles.sizeSlider}
            />
          </div>
        </div>

        <div className={styles.canvasArea}>
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className={styles.canvas}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
          />
        </div>
      </div>

      <div className={styles.colorBar}>
        <div className={styles.currentColor}>
          <div className={styles.colorPreview} style={{ background: selectedColor }} />
        </div>
        <div className={styles.colorPalette}>
          {colors.map((color) => (
            <button
              key={color}
              className={`${styles.colorBtn} ${selectedColor === color ? styles.colorActive : ''}`}
              style={{ background: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
