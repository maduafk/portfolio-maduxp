import { useState, useRef, useEffect } from 'react';
import styles from './Terminal.module.css';

const COMMANDS = {
  help: () => `
Comandos disponíveis:
  help        - Mostra esta lista de comandos
  about       - Informações sobre mim
  skills      - Minhas habilidades técnicas
  projects    - Lista de projetos
  contact     - Informações de contato
  social      - Links para redes sociais
  exp         - Experiência profissional
  cls         - Limpa a tela
  date        - Data e hora atuais
  echo [msg]  - Repete a mensagem
  ver         - Versão do sistema`,

  about: () => `
╔═══════════════════════════════════════════╗
║           SOBRE MIM                       ║
╠═══════════════════════════════════════════╣
║  Nome:      Maria Eduarda Silva Viana     ║
║  Nick:      madugamer0412                 ║
║  Cargo:     Dev Java Júnior               ║
║  Local:     Goiânia - GO, Brasil          ║
║  Formação:  Eng. Software (dez/2026)      ║
║  Faculdade: Faculdade Alfredo Nasser        ║
║  Idiomas:   PT (nativo), EN (int-avanç.)  ║
╚═══════════════════════════════════════════╝`,

  skills: () => `
[HABILIDADES TÉCNICAS]
━━━━━━━━━━━━━━━━━━━━━
Backend:   Java        ████████░░ 80%
           Spring Boot ███████░░░ 70%
           APIs REST   ████████░░ 85%
           Node.js     ██████░░░░ 65%
           TypeScript  ██████░░░░ 60%
Frontend:  JavaScript  ███████░░░ 75%
           Angular     ██████░░░░ 65%
           React       ██████░░░░ 65%
           HTML/CSS    ████████░░ 80%
Banco:     SQL         ████████░░ 80%
           PostgreSQL  ███████░░░ 78%
           Oracle      ██████░░░░ 65%
DevOps:    Git         ████████░░ 85%
           Docker      ██████░░░░ 65%
           Jira        ██████░░░░ 60%
IA:        Cursor      ████████░░ 85%`,

  projects: () => `
[PROJETOS]
━━━━━━━━━
1. Portfolio Madu           - React / Vite (este!)
2. API REST - Java         - Spring Boot / SQL
3. API - TypeScript        - Node.js / PostgreSQL
4. Avalara                 - estágio encerrado em 07/2026
5. Oobj                    - estágio encerrado em 12/2024

Use "start [número]" para mais detalhes.`,

  contact: () => `
[CONTATO]
━━━━━━━━
Email:    softwaremadu@gmail.com
Celular:  (62) 99240-7797
Site:     maduviana.com.br
GitHub:   github.com/maduafk
LinkedIn: linkedin.com/in/madu-viana

Fique à vontade para entrar em contato! :)`,

  social: () => `
[REDES SOCIAIS]
━━━━━━━━━━━━━━
GitHub:   https://github.com/maduafk
LinkedIn: https://www.linkedin.com/in/madu-viana/`,

  exp: () => `
[EXPERIÊNCIA PROFISSIONAL]
━━━━━━━━━━━━━━━━━━━━━━━━━

> Avalara | Remoto (12/2024 - 07/2026) — concluído
  Estágio em Engenharia de Software
  • Sistemas em produção, bugs críticos e melhorias
  • APIs REST e interfaces com Angular e JavaScript
  • Testes unitários, Docker e Jira

> Oobj | Remoto (07/2024 - 12/2024) — concluído
  Estágio em Engenharia de Software
  • Sistemas fiscais (NFe, NFCe, CT-e, MDFe)
  • APIs REST, PostgreSQL, Oracle e Docker

> SIGEP | Presencial (01/2024 - 07/2024) — concluído
  Estágio em Infraestrutura de TI
  • Servidores, redes, backup e banco de dados
  • Monitoramento de segurança`,

  date: () => `Data: ${new Date().toLocaleDateString('pt-BR')} | Hora: ${new Date().toLocaleTimeString('pt-BR')}`,

  ver: () => `
MaduOS [Versão XP.2026]
(c) 2026 Maria Eduarda Silva Viana. Todos os direitos reservados.`,
};

const PROJECT_DETAILS = {
  1: `
[Projeto 1] Portfolio Madu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stack:     React 19, Vite 8, xp.css
Descrição: Portfolio temático Windows XP com BIOS, boot,
           login, desktop e apps interativos.
Destaque:  UI 100% fiel ao Windows XP original.
GitHub:    github.com/maduafk`,
  2: `
[Projeto 2] API REST - Java
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stack:     Java, Spring Boot, SQL
Descrição: API RESTful com autenticação, CRUD completo
           e conexão com banco de dados.
Destaque:  Projeto acadêmico.`,
  3: `
[Projeto 3] API - TypeScript
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stack:     Node.js, TypeScript, PostgreSQL
Descrição: Backend com rotas, validações, controllers
           e persistência de dados.
Destaque:  Projeto acadêmico.`,
  4: `
[Projeto 4] Avalara
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stack:     Java, Angular, JavaScript, Docker, Jira
Descrição: APIs REST, interfaces web e correção de
           bugs em sistemas em produção.
Obs:       Estágio concluído em jul/2026. Código privado.`,
  5: `
[Projeto 5] Oobj
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stack:     Java, PostgreSQL, Oracle, Docker
Descrição: Sistemas fiscais (NFe, NFCe, CT-e, MDFe),
           APIs REST e queries em produção.
Obs:       Estágio concluído em dez/2024. Código privado.`,
};

export default function Terminal() {
  const [history, setHistory] = useState([
    'MaduOS [Versão XP.2026]',
    '(C) 2026 Maria Eduarda Silva Viana.',
    '',
    'Bem-vindo ao meu portfolio! Digite "help" para ver os comandos.',
    '',
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    if (command === 'cls') {
      setHistory([]);
      return;
    }

    if (command === 'echo') {
      setHistory(prev => [...prev, `C:\\>${cmd}`, args || '', '']);
      return;
    }

    if (command === 'start') {
      const arg = parts.slice(1).find(Boolean);
      if (arg === undefined) {
        setHistory(prev => [...prev, `C:\\>${cmd}`, 'Uso: start [número do projeto]', '']);
        return;
      }
      const n = parseInt(arg, 10);
      if (Number.isNaN(n) || n < 1 || n > 5) {
        setHistory(prev => [
          ...prev,
          `C:\\>${cmd}`,
          'Número inválido. Use um projeto de 1 a 5.',
          '',
        ]);
        return;
      }
      setHistory(prev => [...prev, `C:\\>${cmd}`, PROJECT_DETAILS[n], '']);
      return;
    }

    if (COMMANDS[command]) {
      const output = COMMANDS[command](args);
      setHistory(prev => [...prev, `C:\\>${cmd}`, output, '']);
    } else if (command === '') {
      setHistory(prev => [...prev, 'C:\\>', '']);
    } else {
      setHistory(prev => [
        ...prev,
        `C:\\>${cmd}`,
        `'${command}' não é reconhecido como um comando interno.`,
        'Digite "help" para ver os comandos disponíveis.',
        '',
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setCommandHistory(prev => [input, ...prev]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className={styles.container} onClick={() => inputRef.current?.focus()}>
      <div className={styles.output}>
        {history.map((line, i) => (
          <div key={i} className={styles.line}>{line}</div>
        ))}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>C:\&gt;</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
