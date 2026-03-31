import { useRef, useMemo, useState, useLayoutEffect } from 'react';
import styles from './WordPad.module.css';

function buildInitialCvHtml(s) {
  return `
<div class="${s.cvHeader}">
  <h1>Maria Eduarda Silva Viana</h1>
  <p>Goiânia - GO · softwaremadu@gmail.com</p>
  <p>github.com/maduafk · linkedin.com/in/maria-eduarda-viana-bb271723a</p>
</div>

<div class="${s.cvSection}">
  <h2>Objetivo</h2>
  <p>Desenvolvedora de Software Júnior com experiência em sistemas de alta disponibilidade, APIs REST, bancos de dados relacionais e serviços em nuvem. Busco contribuir em equipes de desenvolvimento, aprendendo e entregando soluções de qualidade.</p>
</div>

<div class="${s.cvSection}">
  <h2>Formação Acadêmica</h2>
  <div class="${s.cvEntry}">
    <strong>Engenharia de Software</strong> <span class="${s.cvDate}">2023 – 2026</span>
    <p>Faculdade Alfredo Nasser — Goiânia, GO</p>
  </div>
</div>

<div class="${s.cvSection}">
  <h2>Experiência Profissional</h2>
  <div class="${s.cvEntry}">
    <strong>Oobj – Avalara</strong> <span class="${s.cvDate}">Jul/2024 – Mai/2026</span>
    <p class="${s.cvRole}">Estagiária de Engenharia de Software — Remoto</p>
    <ul>
      <li>Manutenção e evolução de sistema de emissão de documentos fiscais eletrônicos (NFe, NFCe, CT-e, MDFe) com processamento de milhares de documentos/dia</li>
      <li>Otimização de queries em PostgreSQL e Oracle para relatórios fiscais (JasperReports)</li>
      <li>Desenvolvimento e ajuste de APIs REST consumidas por clientes enterprise</li>
      <li>Integração com webservices da SEFAZ, tratamento de retornos e conformidade fiscal</li>
      <li>Processamento assíncrono de eventos com JMS/ActiveMQ em alta volumetria</li>
      <li>Utilização de AWS (S3, SQS, SES) e Docker em ambiente de produção</li>
      <li>Cobertura de testes com JUnit e análise de qualidade via SonarQube</li>
      <li>Leitura e interpretação de documentação técnica em inglês como rotina</li>
    </ul>
  </div>
  <div class="${s.cvEntry}">
    <strong>SIGEP — Sistema Integrado de Gestão Pública</strong> <span class="${s.cvDate}">Jan/2024 – Jul/2024</span>
    <p class="${s.cvRole}">Estagiária de Infraestrutura de TI — Presencial</p>
    <ul>
      <li>Suporte e manutenção de servidores e infraestrutura de rede</li>
      <li>Monitoramento de segurança e disponibilidade de sistemas</li>
      <li>Suporte técnico à equipe, contribuindo para redução de chamados recorrentes</li>
    </ul>
  </div>
</div>

<div class="${s.cvSection}">
  <h2>Projetos</h2>
  <div class="${s.cvEntry}">
    <strong>Portfólio Madu</strong> <span class="${s.cvDate}">2026</span>
    <p>Portfólio interativo com tema fiel ao Windows XP. Simula BIOS, boot, login e desktop com 15+ aplicações funcionais. React 19, Vite, CSS Modules.</p>
  </div>
  <div class="${s.cvEntry}">
    <strong>API REST — TypeScript</strong> <span class="${s.cvDate}">2025</span>
    <p>Backend com Node.js, TypeScript e Express. Rotas, validações, controllers e persistência com PostgreSQL.</p>
  </div>
  <div class="${s.cvEntry}">
    <strong>App Android — Gerenciamento de Estudos</strong> <span class="${s.cvDate}">2025</span>
    <p>Aplicativo mobile com Kotlin, Firebase e Android Studio.</p>
  </div>
  <div class="${s.cvEntry}">
    <strong>API REST — Java</strong> <span class="${s.cvDate}">2024</span>
    <p>API RESTful com autenticação, CRUD completo e banco de dados. Java, Spring Boot, SQL.</p>
  </div>
</div>

<div class="${s.cvSection}">
  <h2>Habilidades Técnicas</h2>
  <p><strong>Backend:</strong> Java, Spring Boot, APIs REST, Node.js, TypeScript, Express</p>
  <p><strong>Frontend:</strong> React, JavaScript, HTML5, CSS3</p>
  <p><strong>Banco de Dados:</strong> PostgreSQL, Oracle, SQL</p>
  <p><strong>DevOps & Cloud:</strong> Docker, Git, AWS (S3, SQS, SES)</p>
  <p><strong>Testes:</strong> JUnit, SonarQube</p>
  <p><strong>Mensageria:</strong> JMS, ActiveMQ</p>
  <p><strong>Mobile:</strong> Kotlin, Firebase, Android Studio</p>
  <p><strong>Idiomas:</strong> Inglês — Intermediário Alto (B2)</p>
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
