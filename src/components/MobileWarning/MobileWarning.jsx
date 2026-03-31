import styles from './MobileWarning.module.css';

export default function MobileWarning() {
  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <div className={styles.icon}>🖥️</div>
        <h2 className={styles.title}>Resolução Incompatível</h2>
        <p className={styles.text}>
          Este portfolio foi feito para ser visualizado em um computador,
          assim como o Windows XP original!
        </p>
        <p className={styles.hint}>
          Acesse pelo seu PC ou notebook para a melhor experiência.
        </p>
        <div className={styles.footer}>
          <span>Resolução recomendada: 1024×768 ou superior</span>
        </div>
      </div>
    </div>
  );
}
