import styles from './WinRARPopup.module.css';

export default function WinRARPopup({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className="window" style={{ width: 380 }}>
        <div className="title-bar">
          <div className="title-bar-text">WinRAR</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose} />
          </div>
        </div>
        <div className="window-body">
          <div className={styles.body}>
            <div className={styles.icon}>📦</div>
            <div className={styles.content}>
              <p className={styles.bold}>
                Você está utilizando uma cópia de avaliação do WinRAR!
              </p>
              <p className={styles.text}>
                O período de avaliação de 40 dias expirou.
                <br />
                Por favor, adquira uma licença para continuar utilizando o WinRAR.
              </p>
              <p className={styles.small}>
                Versão: WinRAR 3.62 — Licença: avaliação expirada há 2847 dias
              </p>
            </div>
          </div>
          <div className="field-row" style={{ justifyContent: 'flex-end', padding: '8px 12px', gap: 6, borderTop: '1px solid #A0A0A0' }}>
            <button onClick={onClose}>Fechar</button>
            <button onClick={onClose}><strong>Comprar licença</strong></button>
          </div>
        </div>
      </div>
    </div>
  );
}
