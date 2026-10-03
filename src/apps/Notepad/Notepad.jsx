import { useState, useRef, useEffect } from 'react';
import styles from './Notepad.module.css';

const defaultText = `=== README.txt ===

Oii! Eu sou a Maria Eduarda, mas todo mundo me chama de Madu :)
Tenho 23 anos e sou apaixonada por tecnologia desde sempre.

Quando criança eu amava desmontar e montar eletrônico pra ver
o que tinha dentro. Foi assim que consertei meu Xbox 360
sozinha e até hoje ele funciona (tenho apego emocional nele).

Depois do ensino médio eu sabia que queria algo de tecnologia
e surgiu a oportunidade de fazer Engenharia de Software na
Faculdade Alfredo Nasser. Com o apoio do meu melhor amigo
(meu pai) decidi fazer o curso e me apaixonei de cara.

Comecei no Java e logo no segundo semestre já tava doida
querendo estágio. Fiz um de infra que me ensinou muito sobre
redes antes mesmo de ter a disciplina na faculdade.

6 meses depois passei no processo seletivo da OObj, uma empresa
de gestão fiscal. Fiquei de julho a dezembro de 2024, em sistemas
de NFe, APIs REST e banco de dados.

A empresa foi comprada pela Avalara e eu continuei o estágio lá,
de dezembro de 2024 até julho de 2026. Foi onde eu mais evoluí:
Java, APIs, interfaces com Angular, Docker, Jira, testes e inglês
no dia a dia.

O estágio acabou em julho de 2026. Agora to procurando uma vaga
júnior. Me sinto preparada pra essa próxima etapa!

=== Por que Windows XP? ===

O XP, o MSN e o Orkut não me tornaram dev diretamente, mas
foram cruciais pra minha paixão por T.I. Os joguinhos do Orkut,
os vídeos do YouTube, as conversas no MSN... tudo isso é parte
de quem eu sou hoje. Esse portfolio é uma homenagem a essa
época que me fez querer viver de tecnologia.

=== Explore o portfolio! ===

- "Meu Computador"     > sobre mim e experiência
- "Meus Documentos"    > projetos
- "Painel de Controle"  > habilidades técnicas
- "Outlook Express"    > me mande um email!
- "MSN Messenger"      > chat nostálgico (eu usava com 6 anos haha)
- "Prompt de Comando"   > terminal interativo
- "Paint"              > desenhe algo!

=== Contato ===
Email:    softwaremadu@gmail.com
Celular:  (62) 99240-7797
Site:     maduviana.com.br
GitHub:   github.com/maduafk
LinkedIn: linkedin.com/in/madu-viana

---
Feito com React, Vite e muita nostalgia do Windows XP ♡`;

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  minWidth: 160,
  background: '#ECE9D8',
  border: '1px solid #808080',
  boxShadow: '2px 2px 4px rgba(0,0,0,0.25)',
  zIndex: 1000,
  padding: '2px 0',
};

const dropdownItemStyle = {
  padding: '4px 12px',
  fontSize: 11,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

export default function Notepad({ initialText }) {
  const [text, setText] = useState(initialText ?? defaultText);
  const [wordWrap, setWordWrap] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [cursorLine, setCursorLine] = useState(1);
  const [cursorCol, setCursorCol] = useState(1);

  const textareaRef = useRef(null);
  const menuBarRef = useRef(null);

  const charCount = text.length;

  const updateCursorPosition = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const val = ta.value;
    const pos = ta.selectionStart;
    const before = val.substring(0, pos);
    const lines = before.split('\n');
    setCursorLine(lines.length);
    setCursorCol((lines[lines.length - 1] || '').length + 1);
  };

  useEffect(() => {
    if (!openMenu) return;
    const onMouseDown = (e) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [openMenu]);

  const handleNovo = () => {
    setText('');
    setOpenMenu(null);
  };

  const handleSalvar = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.txt';
    a.click();
    URL.revokeObjectURL(url);
    setOpenMenu(null);
  };

  const handleSelecionarTudo = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.focus();
      ta.select();
    }
    setOpenMenu(null);
  };

  const handleCopiar = async () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const slice = ta.value.slice(start, end);
    const toCopy = slice.length > 0 ? slice : ta.value;
    try {
      await navigator.clipboard.writeText(toCopy);
    } catch {
      /* ignore */
    }
    setOpenMenu(null);
  };

  const handleSobre = () => {
    setOpenMenu(null);
    window.alert(
      'Bloco de Notas\n\nUm editor de texto simples do tema Windows XP deste portfólio.\nCriado com React.'
    );
  };

  const menuItemHover = (e, on) => {
    e.currentTarget.style.background = on ? '#316AC5' : 'transparent';
    e.currentTarget.style.color = on ? '#FFF' : '#000';
  };

  const DropdownItem = ({ children, onClick }) => (
    <div
      role="menuitem"
      style={dropdownItemStyle}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      onMouseEnter={(e) => menuItemHover(e, true)}
      onMouseLeave={(e) => menuItemHover(e, false)}
    >
      {children}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.menuBar} ref={menuBarRef}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span
            className={styles.menuItem}
            onClick={() => setOpenMenu((m) => (m === 'arquivo' ? null : 'arquivo'))}
          >
            Arquivo
          </span>
          {openMenu === 'arquivo' && (
            <div style={dropdownStyle} role="menu">
              <DropdownItem onClick={handleNovo}>Novo</DropdownItem>
              <DropdownItem onClick={handleSalvar}>Salvar</DropdownItem>
            </div>
          )}
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span
            className={styles.menuItem}
            onClick={() => setOpenMenu((m) => (m === 'editar' ? null : 'editar'))}
          >
            Editar
          </span>
          {openMenu === 'editar' && (
            <div style={dropdownStyle} role="menu">
              <DropdownItem onClick={handleSelecionarTudo}>Selecionar Tudo</DropdownItem>
              <DropdownItem onClick={handleCopiar}>Copiar</DropdownItem>
            </div>
          )}
        </div>
        <span
          className={styles.menuItem}
          onClick={() => setWordWrap((w) => !w)}
        >
          Formatar
        </span>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span
            className={styles.menuItem}
            onClick={() => setOpenMenu((m) => (m === 'exibir' ? null : 'exibir'))}
          >
            Exibir
          </span>
          {openMenu === 'exibir' && (
            <div style={dropdownStyle} role="menu">
              <DropdownItem
                onClick={() => {
                  setShowStatusBar((s) => !s);
                  setOpenMenu(null);
                }}
              >
                {showStatusBar ? 'Ocultar barra de status' : 'Mostrar barra de status'}
              </DropdownItem>
            </div>
          )}
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span
            className={styles.menuItem}
            onClick={() => setOpenMenu((m) => (m === 'ajuda' ? null : 'ajuda'))}
          >
            Ajuda
          </span>
          {openMenu === 'ajuda' && (
            <div style={dropdownStyle} role="menu">
              <DropdownItem onClick={handleSobre}>Sobre o Bloco de Notas</DropdownItem>
            </div>
          )}
        </div>
      </div>
      <textarea
        ref={textareaRef}
        className={styles.editor}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          updateCursorPosition();
        }}
        onSelect={updateCursorPosition}
        onClick={updateCursorPosition}
        onKeyUp={updateCursorPosition}
        spellCheck={false}
        style={{ whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}
      />
      {showStatusBar && (
        <div className="status-bar">
          <p className="status-bar-field">
            Ln {cursorLine}, Col {cursorCol}
          </p>
          <p className="status-bar-field">{charCount} caracteres</p>
        </div>
      )}
    </div>
  );
}
