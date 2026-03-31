import { useState } from 'react';
import styles from './LoginScreen.module.css';

export default function LoginScreen({ onLogin, onShutdown }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.screen}>
      <div className={styles.topBar} />

      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <div className={styles.branding}>
            <img
              src="/assets/xp-logo.png"
              alt="Microsoft Windows XP Professional"
              className={styles.logo}
              draggable={false}
            />
          </div>
          <p className={styles.welcome}>Para começar, clique no seu nome de usuário</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.rightPanel}>
          <div
            className={`${styles.userCard} ${hovered ? styles.userCardHover : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onLogin}
          >
            <div className={styles.avatar}>
              <img
                src="/assets/user-photo.png"
                alt="madugamer0412"
                className={styles.avatarImg}
                draggable={false}
              />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>madugamer0412</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.shutdownBtn} onClick={onShutdown}>
          <svg viewBox="0 0 20 20" width="18" height="18">
            <circle cx="10" cy="10" r="9" fill="#CC3300" stroke="#AA2200" strokeWidth="0.5"/>
            <rect x="9" y="3" width="2" height="7" rx="1" fill="#FFF"/>
            <path d="M6.5,6 A5,5 0 1,0 13.5,6" stroke="#FFF" strokeWidth="1.8" fill="none"/>
          </svg>
          <span>Desligar computador</span>
        </button>
        <span className={styles.hint}>
          Depois de fazer logon, você pode adicionar ou alterar contas.
          Basta ir ao Painel de controle e clicar em Contas de usuário.
        </span>
      </div>
    </div>
  );
}
