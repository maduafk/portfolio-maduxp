import { useRef, useMemo, useState, useLayoutEffect } from 'react';
import styles from './WordPad.module.css';

function buildInitialCvHtml(s) {
  return `
<div class="${s.cvHeader}">
  <h1>Maria Eduarda Silva Viana</h1>
  <p>Engenheira de Software Júnior · Goiânia - GO</p>
  <p>softwaremadu@gmail.com · (62) 99240-7797</p>
  <p>maduviana.com.br · github.com/maduafk · linkedin.com/in/madu-viana</p>
</div>

<div class="${s.cvSection}">
  <h2>Perfil</h2>
  <p>Engenheira de Software Júnior com experiência em sistemas em produção, APIs REST, correção de bugs e bancos de dados relacionais. Java e Spring Boot aplicados em projetos, testes unitários, Docker e integração de serviços. Busco uma vaga júnior.</p>
</div>

<div class="${s.cvSection}">
  <h2>Formação Acadêmica</h2>
  <div class="${s.cvEntry}">
    <strong>Engenharia de Software</strong> <span class="${s.cvDate}">2023 – dez/2026</span>
    <p>Faculdade Alfredo Nasser — Goiânia, GO. Presencial, período noturno.</p>
  </div>
</div>

<div class="${s.cvSection}">
  <h2>Experiência Profissional</h2>
  <div class="${s.cvEntry}">
    <strong>Avalara</strong> <span class="${s.cvDate}">Dez/2024 – Mai/2026</span>
    <p class="${s.cvRole}">Estagiária de Engenharia de Software — Remoto (concluído)</p>
    <ul>
      <li>Atuação em sistemas em produção, com correção de bugs críticos e melhorias contínuas</li>
      <li>Desenvolvimento e evolução de APIs REST para integração com serviços externos</li>
      <li>Interfaces web com Angular e JavaScript</li>
      <li>Testes unitários, Docker e acompanhamento de tarefas no Jira</li>
    </ul>
  </div>
  <div class="${s.cvEntry}">
    <strong>Oobj</strong> <span class="${s.cvDate}">Jul/2024 – Dez/2024</span>
    <p class="${s.cvRole}">Estagiária de Engenharia de Software — Remoto (concluído)</p>
    <ul>
      <li>Desenvolvimento e manutenção de sistemas fiscais (NFe, NFCe, CT-e e MDFe)</li>
      <li>Implementação e consumo de APIs REST</li>
      <li>Correção de bugs e análise de falhas em produção</li>
      <li>Escrita e otimização de queries em PostgreSQL e Oracle, com uso de Docker</li>
    </ul>
  </div>
  <div class="${s.cvEntry}">
    <strong>SIGEP — Sistema Integrado de Gestão Pública</strong> <span class="${s.cvDate}">Jan/2024 – Jul/2024</span>
    <p class="${s.cvRole}">Estagiária de Infraestrutura de TI — Presencial (concluído)</p>
    <ul>
      <li>Suporte em servidores e redes</li>
      <li>Backup e manutenção de banco de dados</li>
      <li>Monitoramento de segurança</li>
    </ul>
  </div>
</div>

<div class="${s.cvSection}">
  <h2>Projetos</h2>
  <div class="${s.cvEntry}">
    <strong>Portfólio Interativo</strong> <span class="${s.cvDate}">maduviana.com.br</span>
    <p>Inspirado no Windows XP, com componentes, Context API e custom hooks. React, JavaScript, Vite e CSS Modules.</p>
  </div>
  <div class="${s.cvEntry}">
    <strong>API REST — Java</strong> <span class="${s.cvDate}">Acadêmico</span>
    <p>API RESTful com autenticação, CRUD completo e banco de dados. Java, Spring Boot e SQL.</p>
  </div>
  <div class="${s.cvEntry}">
    <strong>API — TypeScript</strong> <span class="${s.cvDate}">Acadêmico</span>
    <p>Backend com Node.js e TypeScript. Rotas, validações, controllers e persistência em PostgreSQL.</p>
  </div>
</div>

<div class="${s.cvSection}">
  <h2>Habilidades Técnicas</h2>
  <p><strong>Java e backend:</strong> Java, Spring Boot, APIs REST, JUnit</p>
  <p><strong>Integração:</strong> Node.js, TypeScript, JMS, ActiveMQ</p>
  <p><strong>Banco de dados:</strong> PostgreSQL, Oracle, SQL</p>
  <p><strong>Frontend:</strong> Angular, React, JavaScript</p>
  <p><strong>Ferramentas:</strong> Git, Docker, Jira, SonarQube</p>
  <p><strong>Idiomas:</strong> Inglês intermediário-avançado (leitura técnica e comunicação)</p>
</div>

<div class="${s.cvSection}">
  <h2>Certificações</h2>
  <ul>
    <li>Java — Fundamentos, java.io, Java e JDBC</li>
    <li>Git — Controle de Versão</li>
    <li>Lógica de Programação</li>
  </ul>
</div>
`.trim();
}

export default function WordPad() {
  const initialHtml = useMemo(() => buildInitialCvHtml(styles), []);
  const editorRef = useRef(null);
  const didInitHtml = useRef(false);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('12');

  useLayoutEffect(() => {
    const el = editorRef.current;
    if (el && !didInitHtml.current) {
      el.innerHTML = initialHtml;
      didInitHtml.current = true;
    }
  }, [initialHtml]);

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const handleNew = () => {
    const el = editorRef.current;
    if (el) {
      el.innerHTML = '';
      didInitHtml.current = true;
    }
    focusEditor();
  };

  const handleSave = () => {
    const el = editorRef.current;
    if (!el) return;
    const blob = new Blob([el.innerText || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento-wordpad.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const runFormat = (command) => {
    focusEditor();
    document.execCommand(command, false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>Arquivo</span>
        <span className={styles.menuItem}>Editar</span>
        <span className={styles.menuItem}>Exibir</span>
        <span className={styles.menuItem}>Inserir</span>
        <span className={styles.menuItem}>Formato</span>
        <span className={styles.menuItem}>Ajuda</span>
      </div>
      <div className={styles.toolbar}>
        <span className={styles.toolIcon} onClick={handleNew} title="Novo">
          📄
        </span>
        <span className={styles.toolIcon}>📂</span>
        <span className={styles.toolIcon} onClick={handleSave} title="Salvar">
          💾
        </span>
        <span className={styles.toolIcon} onClick={handlePrint} title="Imprimir">
          🖨️
        </span>
        <span className={styles.toolSep} />
        <span className={styles.toolIcon}>↩</span>
        <select
          className={styles.fontSelect}
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <select
          className={styles.sizeSelect}
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
        </select>
        <span className={styles.toolBtn} onClick={() => runFormat('bold')}>
          <strong>B</strong>
        </span>
        <span className={styles.toolBtn} onClick={() => runFormat('italic')}>
          <em>I</em>
        </span>
        <span className={styles.toolBtn} onClick={() => runFormat('underline')}>
          <u>S</u>
        </span>
      </div>
      <div
        ref={editorRef}
        className={styles.content}
        contentEditable
        suppressContentEditableWarning
        style={{ fontFamily, fontSize: `${fontSize}px` }}
      />
      <div className={styles.statusBar}>
        <span>Para obter Ajuda, pressione F1</span>
        <span>Página 1</span>
      </div>
    </div>
  );
}
