import { useState, useEffect } from 'react';
import styles from './LimeWire.module.css';

const downloads = [
  { name: 'Justin Bieber - Baby ft. Ludacris.mp3', size: '3.8 MB', speed: '48 kb/s', status: 'downloading', progress: 0 },
  { name: 'Justin Bieber - One Less Lonely Girl.mp3', size: '3.5 MB', speed: '—', status: 'queue', progress: 0 },
  { name: 'justin_bieber_never_say_never_FINAL_real.mp3.exe', size: '752 KB', speed: '—', status: 'warning', progress: 0 },
  { name: 'Restart - Levo Comigo.mp3', size: '4.1 MB', speed: '22 kb/s', status: 'downloading', progress: 0 },
  { name: 'Rebeldes - Rebelde Para Sempre.mp3', size: '3.9 MB', speed: '—', status: 'queue', progress: 0 },
  { name: 'Kelly Clarkson - Since U Been Gone.mp3', size: '3.6 MB', speed: '—', status: 'queue', progress: 0 },
  { name: 'Justin Bieber - Discografia_Completa.rar', size: '45 MB', speed: '2 kb/s', status: 'slow', progress: 0 },
  { name: 'Avril Lavigne - Complicated.mp3', size: '4.0 MB', speed: '—', status: 'queue', progress: 0 },
  { name: 'Black Eyed Peas - Boom Boom Pow.mp3', size: '3.7 MB', speed: '—', status: 'queue', progress: 0 },
  { name: 'Justin Bieber - One Time.mp3', size: '3.4 MB', speed: '—', status: 'queue', progress: 0 },
];

export default function LimeWire() {
  const [items, setItems] = useState(downloads);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setItems(prev => prev.map(item => {
        if (item.status === 'downloading' || item.status === 'slow') {
          const increment = item.status === 'slow' ? 0.5 : 2 + Math.random() * 3;
          const newProgress = Math.min(item.progress + increment, 100);
          return {
            ...item,
            progress: newProgress,
            status: newProgress >= 100 ? 'complete' : item.status,
          };
        }
        return item;
      }));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const activeCount = items.filter(i => i.status === 'downloading' || i.status === 'slow').length;
  const totalSpeed = items.reduce((sum, i) => {
    if (i.status === 'downloading') return sum + 48;
    if (i.status === 'slow') return sum + 2;
    return sum;
  }, 0);

  const runSearch = () => {
    setAppliedSearch(searchTerm.trim());
  };

  const visibleItems =
    appliedSearch === ''
      ? items
      : items.filter((i) => i.name.toLowerCase().includes(appliedSearch.toLowerCase()));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.logo}>🍋 LimeWire</span>
        <span className={styles.subtitle}>Downloads</span>
      </div>
      <div className={styles.searchBar}>
        <span>Buscar:</span>
        <input
          className={styles.searchInput}
          placeholder="músicas, filmes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') runSearch();
          }}
        />
        <button type="button" className={styles.searchBtn} onClick={runSearch}>
          🔍
        </button>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.colName}>Nome do Arquivo</span>
          <span className={styles.colSize}>Tamanho</span>
          <span className={styles.colSpeed}>Velocidade</span>
          <span className={styles.colStatus}>Status</span>
        </div>
        {visibleItems.map((item, i) => (
          <div key={item.name + i} className={styles.tableRow}>
            <span className={styles.colName}>
              <span className={styles.icon}>
                {item.status === 'warning' ? '⚠️' : item.status === 'complete' ? '✅' : '🎵'}
              </span>
              {item.name}
            </span>
            <span className={styles.colSize}>{item.size}</span>
            <span className={styles.colSpeed}>{item.speed}</span>
            <span className={styles.colStatus}>
              {item.status === 'downloading' || item.status === 'slow' ? (
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${item.progress}%` }} />
                </div>
              ) : item.status === 'complete' ? (
                <span className={styles.complete}>Completo</span>
              ) : item.status === 'warning' ? (
                <span className={styles.warning}>⚠️ Vírus?</span>
              ) : (
                <span className={styles.queue}>Na fila</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <span>Downloads ativos: {activeCount}</span>
        <span>Velocidade total: {totalSpeed} kb/s</span>
        <span>Fontes: 3 de 47 usuários</span>
      </div>
    </div>
  );
}
