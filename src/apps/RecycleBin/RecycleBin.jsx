import { useRecycleBinState } from '../../context/RecycleBinContext';
import styles from './RecycleBin.module.css';

export default function RecycleBin() {
  const { deletedItems, emptyTrash } = useRecycleBinState();

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button type="button" onClick={emptyTrash} disabled={deletedItems.length === 0}>
          Esvaziar Lixeira
        </button>
      </div>

      <div className={styles.body}>
        {deletedItems.length === 0 ? (
          <div className={styles.empty}>A Lixeira está vazia.</div>
        ) : (
          <div className={styles.fileList}>
            <div className={styles.listHeader}>
              <span className={styles.colName}>Nome</span>
              <span className={styles.colType}>Tipo</span>
              <span className={styles.colSize}>Tamanho</span>
              <span className={styles.colDate}>Data</span>
            </div>
            {deletedItems.map((item, i) => (
              <div key={`${item.name}-${i}`} className={styles.fileRow}>
                <span className={styles.colName}>
                  <span className={styles.fileIcon}>{item.icon}</span>
                  {item.name}
                </span>
                <span className={styles.colType}>{item.type || 'Arquivo'}</span>
                <span className={styles.colSize}>{item.size || '—'}</span>
                <span className={styles.colDate}>{item.date || '—'}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="status-bar">
        <p className="status-bar-field">{deletedItems.length} objeto(s)</p>
        <p className="status-bar-field">Lixeira</p>
      </div>
    </div>
  );
}
