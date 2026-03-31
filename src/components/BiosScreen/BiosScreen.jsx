import { useState, useEffect, useRef } from 'react';
import styles from './BiosScreen.module.css';

const LINES = [
  { text: '', delay: 300 },
  { text: 'www.ami.com          Copyright (C) 2003 American Megatrends, Inc.', delay: 400, color: '#888' },
  { text: '', delay: 500 },
  { text: 'AMIBIOS (C) 2003 American Megatrends, Inc.', delay: 600 },
  { text: 'BIOS Rev. 08.00T  Date: 07/14/2003', delay: 700 },
  { text: '', delay: 800 },
  { text: 'Press DEL to run Setup', delay: 900 },
  { text: 'Press <F8> for BBS POPUP', delay: 950 },
  { text: 'Checking NVRAM...', delay: 1050 },
  { text: 'Initializing USB Controllers .. Done.', delay: 1200 },
  { text: '', delay: 1300 },
  { text: '512MB OK', delay: 1400, color: '#FFFFFF', bold: true },
  { text: '', delay: 1500 },
  { text: 'USB Device(s): 1 Keyboard, 1 Mouse', delay: 1600 },
  { text: 'Auto-Detecting Pri Master..IDE Hard Disk', delay: 1700, highlight: 'IDE Hard Disk' },
  { text: '  Pri Master: SAMSUNG SP0802N  TS100-04', delay: 1800 },
  { text: 'Auto-Detecting Pri Slave...ATAPI CD-ROM', delay: 1900, highlight: 'ATAPI CD-ROM' },
  { text: '  Pri Slave : HL-DT-ST DVDWOM GSA G167B  DL13', delay: 2000 },
  { text: '      Ultra DMA Mode-5, S.M.A.R.T. Capable and Status OK', delay: 2100, hasOk: true },
  { text: '', delay: 2200 },
  { text: 'Detecting USB Mass Storage Devices ...', delay: 2300, color: '#FFFF55' },
  { text: '1 mass storage devices found and configured.', delay: 2500 },
];

export default function BiosScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [showLogo, setShowLogo] = useState(false);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const t0 = setTimeout(() => setShowLogo(true), 100);
    timeoutsRef.current.push(t0);

    LINES.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    const done = setTimeout(() => onComplete(), 3200);
    timeoutsRef.current.push(done);

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [onComplete]);

  const renderLine = (line, i) => {
    if (!line) return null;

    if (line.highlight) {
      const idx = line.text.indexOf(line.highlight);
      if (idx >= 0) {
        const before = line.text.slice(0, idx);
        const hl = line.text.slice(idx, idx + line.highlight.length);
        const after = line.text.slice(idx + line.highlight.length);
        return (
          <div key={i} className={styles.line}>
            {before}<span className={styles.hlYellow}>{hl}</span>{after}
          </div>
        );
      }
    }

    if (line.hasOk) {
      const okIdx = line.text.lastIndexOf('OK');
      if (okIdx >= 0) {
        return (
          <div key={i} className={styles.line}>
            {line.text.slice(0, okIdx)}<span className={styles.hlGreen}>OK</span>
          </div>
        );
      }
    }

    return (
      <div
        key={i}
        className={styles.line}
        style={{
          color: line.color || undefined,
          fontWeight: line.bold ? 'bold' : undefined,
        }}
      >
        {line.text || '\u00A0'}
      </div>
    );
  };

  return (
    <div className={styles.bios}>
      {showLogo && (
        <div className={styles.logoArea}>
          <img src="/assets/ami-logo.png" alt="American Megatrends" className={styles.amiLogo} draggable={false} />
        </div>
      )}
      <div className={styles.content}>
        {visibleLines.map(renderLine)}
        <span className={styles.cursor}>_</span>
      </div>
    </div>
  );
}
