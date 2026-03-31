import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './MediaPlayer.module.css';

const MUSIC_FILES = [
  { title: 'Linkin_Park-In_The_End_(4shared.com).mp3', file: '/music/track01.mp3' },
  { title: 'CaRiOcA_GiRlS_fUnK_2009_(4shared).mp3', file: '/music/track02.mp3' },
  { title: 'Avril_Lavigne-Complicated_[4shared.com.br].mp3', file: '/music/track03.mp3' },
  { title: 'Justin_Bieber_ft_Jaden_Smith-Never_Say_Never(4shared).mp3', file: '/music/track04.mp3' },
  { title: 'ReSt4rT-Levo_Comigo_♥_(4shared.com).mp3', file: '/music/track05.mp3' },
];

export default function MediaPlayer() {
  const audioRef = useRef(null);
  const [tracks] = useState(MUSIC_FILES);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [activeTab, setActiveTab] = useState('playlist');

  const currentTrack = currentIdx >= 0 ? tracks[currentIdx] : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onEnd = () => {
      if (currentIdx < tracks.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onDur);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onDur);
      audio.removeEventListener('ended', onEnd);
    };
  }, [currentIdx, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIdx < 0) return;
    audio.src = tracks[currentIdx].file;
    if (isPlaying) audio.play().catch(() => {});
  }, [currentIdx, tracks]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentIdx < 0 && tracks.length > 0) {
      setCurrentIdx(0);
      setIsPlaying(true);
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, currentIdx, tracks.length]);

  const selectTrack = (idx) => {
    setCurrentIdx(idx);
    setIsPlaying(true);
  };

  const prevTrack = () => { if (currentIdx > 0) setCurrentIdx(currentIdx - 1); };
  const nextTrack = () => { if (currentIdx < tracks.length - 1) setCurrentIdx(currentIdx + 1); };
  const stop = () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } setIsPlaying(false); };

  const seekTo = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && duration) audioRef.current.currentTime = pct * duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className={styles.container}>
      <audio ref={audioRef} />
      <div className={styles.sidebar}>
        <div className={styles.sideHeader}>
          <span className={styles.sideTitle}>Windows<br />Media Player</span>
        </div>
        <button
          className={`${styles.sideItem} ${activeTab === 'playing' ? styles.sideActive : ''}`}
          onClick={() => setActiveTab('playing')}
        >
          Now Playing
        </button>
        <button
          className={`${styles.sideItem} ${activeTab === 'playlist' ? styles.sideActive : ''}`}
          onClick={() => setActiveTab('playlist')}
        >
          Playlist
        </button>
      </div>

      <div className={styles.main}>
        {activeTab === 'playing' && (
          <div className={styles.visualizer}>
            <div className={styles.vizBars}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.vizBar} ${isPlaying ? styles.vizActive : ''}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
            <p className={styles.trackInfo}>
              {currentTrack ? currentTrack.title : 'Nenhuma faixa selecionada'}
            </p>
          </div>
        )}

        {activeTab === 'playlist' && (
          <div className={styles.playlistView}>
            <table className={styles.trackTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Arquivo</th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track, i) => (
                  <tr
                    key={i}
                    className={currentIdx === i ? styles.activeLine : ''}
                    onClick={() => selectTrack(i)}
                  >
                    <td>{i + 1}</td>
                    <td>{track.title}</td>
                    <td className={styles.fileCol}>{track.file.split('/').pop()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.hint}>
            </p>
          </div>
        )}

        <div className={styles.controls}>
          <div className={styles.progressArea}>
            <span className={styles.time}>{fmt(currentTime)}</span>
            <div className={styles.progressBar} onClick={seekTo}>
              <div className={styles.progressFill} style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }} />
            </div>
            <span className={styles.time}>{fmt(duration)}</span>
          </div>
          <div className={styles.buttons}>
            <button className={styles.ctrlBtn} onClick={prevTrack}>⏮</button>
            <button className={`${styles.ctrlBtn} ${styles.playBtn}`} onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className={styles.ctrlBtn} onClick={stop}>⏹</button>
            <button className={styles.ctrlBtn} onClick={nextTrack}>⏭</button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={styles.volumeSlider}
            />
            <span className={styles.volumeIcon}>🔊</span>
          </div>
        </div>
      </div>
    </div>
  );
}
