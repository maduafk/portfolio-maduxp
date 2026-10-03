import { useState } from 'react';
import styles from './Explorer.module.css';

const initialFolders = {
  root: {
    path: 'C:\\Documents and Settings\\madugamer0412\\Meus Documentos\\',
    items: [
      { name: 'Projetos', type: 'folder', icon: '📁', target: 'projetos' },
      { name: 'Downloads', type: 'folder', icon: '📁', target: 'downloads' },
      { name: 'Faculdade', type: 'folder', icon: '📁', target: 'faculdade' },
      { name: 'Curriculo-MariaEduardaViana.pdf', type: 'file', icon: '📄', size: '115 KB', date: '03/10/2026' },
      { name: 'README.md', type: 'file', icon: '📝', size: '4 KB', date: '03/10/2026' },
      { name: 'fotos_perfil', type: 'folder', icon: '📁', target: 'fotos' },
    ],
  },
  projetos: {
    path: 'C:\\Documents and Settings\\madugamer0412\\Meus Documentos\\Projetos\\',
    items: [
      { name: 'portfolio-windows-xp', type: 'folder', icon: '📁', desc: 'React / Vite', status: '🟢 Ativo' },
      { name: 'api-rest-typescript', type: 'folder', icon: '📁', desc: 'Node.js / Express', status: '🟢 Concluído' },
      { name: 'app-android-estudos', type: 'folder', icon: '📁', desc: 'Kotlin / Firebase', status: '🟢 Concluído' },
      { name: 'api-rest-java', type: 'folder', icon: '📁', desc: 'Spring Boot / SQL', status: '🟢 Concluído' },
      { name: 'colaboracoes-avalara', type: 'folder', icon: '📁', desc: 'Java / Angular', status: '🔒 Encerrado mai/2026' },
      { name: 'colaboracoes-oobj', type: 'folder', icon: '📁', desc: 'Java / Fiscal', status: '🔒 Encerrado dez/2024' },
      { name: 'docker-compose.yml', type: 'file', icon: '🐳', size: '1 KB', date: '29/03/2026' },
    ],
  },
  faculdade: {
    path: 'C:\\Documents and Settings\\madugamer0412\\Meus Documentos\\Faculdade\\',
    items: [
      { name: 'Engenharia_de_Software', type: 'folder', icon: '📁' },
      { name: 'Certificacao_Logica_Programacao.pdf', type: 'file', icon: '📄', size: '320 KB', date: '15/06/2024' },
      { name: 'Certificacao_Git.pdf', type: 'file', icon: '📄', size: '285 KB', date: '20/08/2024' },
      { name: 'Certificacao_Java_Fundamentos.pdf', type: 'file', icon: '📄', size: '310 KB', date: '10/10/2024' },
      { name: 'Certificacao_Java_IO.pdf', type: 'file', icon: '📄', size: '290 KB', date: '05/12/2024' },
      { name: 'Certificacao_Java_JDBC.pdf', type: 'file', icon: '📄', size: '305 KB', date: '20/02/2025' },
      { name: 'anotacoes_aula.txt', type: 'file', icon: '📝', size: '12 KB', date: '25/03/2026' },
    ],
  },
  downloads: {
    path: 'C:\\Documents and Settings\\madugamer0412\\Meus Documentos\\Downloads\\',
    items: [
      { name: 'Minecraft_1.5.2_setup.exe', type: 'file', icon: '💾', size: '28.4 MB', date: '17/06/2005' },
      { name: 'eMule_0.50a_installer.exe', type: 'file', icon: '💾', size: '3.2 MB', date: '23/09/2006' },
      { name: 'winamp_5.66_final.exe', type: 'file', icon: '💾', size: '7.4 MB', date: '12/03/2007' },
      { name: 'cs_1.6_maps_dust2.zip', type: 'file', icon: '📦', size: '183 MB', date: '08/02/2006' },
      { name: 'MSN_Plus_4.81_setup.exe', type: 'file', icon: '💾', size: '5.6 MB', date: '14/08/2007' },
      { name: 'limewire_pro_CRACK.exe', type: 'file', icon: '⚠️', size: '???', date: '???' },
    ],
  },
  fotos: {
    path: 'C:\\Documents and Settings\\madugamer0412\\Meus Documentos\\fotos_perfil\\',
    items: [
      { name: 'foto_perfil_madu.jpg', type: 'file', icon: '🖼️', size: '2.4 MB', date: '15/01/2026' },
      { name: 'club_penguin_madu.png', type: 'file', icon: '🖼️', size: '98 KB', date: '03/07/2008', image: '/assets/club-penguin-madu.png' },
      { name: 'foto_avalara_team.jpg', type: 'file', icon: '🖼️', size: '3.1 MB', date: '10/11/2025' },
      { name: 'screenshot_portfolio.png', type: 'file', icon: '🖼️', size: '1.8 MB', date: '29/03/2026' },
    ],
  },
};

export default function Explorer() {
  const [folders, setFolders] = useState(() => JSON.parse(JSON.stringify(initialFolders)));
  const [currentFolder, setCurrentFolder] = useState('root');
  const [history, setHistory] = useState(['root']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [previewImage, setPreviewImage] = useState(null);

  const folder = folders[currentFolder];

  const navigateTo = (folderId) => {
    const newHistory = [...history.slice(0, historyIndex + 1), folderId];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFolder(folderId);
    setSelectedIndex(-1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentFolder(history[historyIndex - 1]);
      setSelectedIndex(-1);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentFolder(history[historyIndex + 1]);
      setSelectedIndex(-1);
    }
  };

  const goUp = () => {
    if (currentFolder !== 'root') navigateTo('root');
  };

  const today = () => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  const addNewFile = () => {
    setFolders(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[currentFolder].items.push({
        name: 'novo_arquivo.txt', type: 'file', icon: '📄', size: '0 KB', date: today(),
      });
      return updated;
    });
  };

  const addNewFolder = () => {
    setFolders(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[currentFolder].items.push({
        name: 'Nova Pasta', type: 'folder', icon: '📁',
      });
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button onClick={goBack} disabled={historyIndex === 0}>◀ Voltar</button>
        <button onClick={goForward} disabled={historyIndex >= history.length - 1}>▶</button>
        <button onClick={goUp} disabled={currentFolder === 'root'}>⬆</button>
        <div className={styles.addressBar}>
          <label style={{fontSize: 11, marginRight: 4}}>Endereço</label>
          <input type="text" readOnly value={folder.path} style={{flex: 1, fontSize: 11}} />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <ul className="tree-view">
            <li>
              <details open>
                <summary>Tarefas de Arquivo</summary>
                <ul>
                  <li style={{ cursor: 'pointer' }} onClick={addNewFile}>📄 Criar novo arquivo</li>
                  <li style={{ cursor: 'pointer' }} onClick={addNewFolder}>📁 Criar nova pasta</li>
                  <li style={{ cursor: 'pointer' }} onClick={() => alert('Esta funcionalidade não está disponível no momento.')}>🌐 Publicar na web</li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>Outros Locais</summary>
                <ul>
                  <li style={{cursor:'pointer'}} onClick={() => navigateTo('root')}>🖥️ Área de Trabalho</li>
                  <li style={{ cursor: 'pointer' }} onClick={() => alert('Nenhuma rede encontrada.')}>🌐 Meus Locais de Rede</li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className={styles.fileList}>
          <div className={styles.listHeader}>
            <span className={styles.colName}>Nome</span>
            <span className={styles.colType}>Tipo</span>
            <span className={styles.colSize}>Tamanho</span>
            <span className={styles.colDate}>Data</span>
          </div>
          {folder.items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className={`${styles.fileRow} ${selectedIndex === i ? styles.fileRowSelected : ''}`}
              onClick={() => setSelectedIndex(i)}
              onDoubleClick={() => {
                if (item.type === 'folder' && item.target) {
                  navigateTo(item.target);
                  return;
                }
                if (item.type === 'file') {
                  if (item.image) {
                    setPreviewImage(item);
                    return;
                  }
                  alert(`Nome: ${item.name}\nTamanho: ${item.size || '—'}\nData: ${item.date || '—'}`);
                }
              }}
            >
              <span className={styles.colName}>
                <span className={styles.fileIcon}>{item.icon}</span>
                {item.name}
              </span>
              <span className={styles.colType}>
                {item.type === 'folder' ? 'Pasta' : item.desc || 'Arquivo'}
                {item.status && ` ${item.status}`}
              </span>
              <span className={styles.colSize}>{item.size || '—'}</span>
              <span className={styles.colDate}>{item.date || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="status-bar">
        <p className="status-bar-field">{folder.items.length} objeto(s)</p>
        <p className="status-bar-field">Meus Documentos</p>
      </div>

      {previewImage && (
        <div className={styles.previewOverlay} onClick={() => setPreviewImage(null)}>
          <div className={styles.previewBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.previewHeader}>
              <span>{previewImage.name}</span>
              <button onClick={() => setPreviewImage(null)}>✕</button>
            </div>
            <img src={previewImage.image} alt={previewImage.name} className={styles.previewImg} draggable={false} />
          </div>
        </div>
      )}
    </div>
  );
}
