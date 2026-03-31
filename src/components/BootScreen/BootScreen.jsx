import styles from './BootScreen.module.css';

export default function BootScreen() {
  return (
    <div className={styles.boot}>
      <div className={styles.center}>
        <img
          src="/assets/xp-flag-boot.png"
          alt=""
          className={styles.flag}
          draggable={false}
        />
        <div className={styles.brandText}>
          <span className={styles.microsoft}>Microsoft<sup className={styles.sup}>&reg;</sup></span>
          <div className={styles.windowsRow}>
            <span className={styles.windows}>Windows</span>
            <span className={styles.xp}>xp</span>
          </div>
        </div>

        <div className={styles.loadingBar}>
          <div className={styles.track}>
            <div className={styles.blocksContainer}>
              <div className={styles.block} />
              <div className={styles.block} />
              <div className={styles.block} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright &copy; Microsoft Corporation
      </div>
    </div>
  );
}
