import { useState, useEffect } from 'react';
import styles from './AboutMe.module.css';

const TABS = [
  { id: 'general', label: 'Geral', panelId: 'tab-general' },
  { id: 'hardware', label: 'Experiência', panelId: 'tab-hw' },
  { id: 'advanced', label: 'Formação', panelId: 'tab-adv' },
];

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className={styles.container}>
      {toast ? (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      ) : null}
      <section className="tabs">
        <menu role="tablist" aria-label="System Properties">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-trigger-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={tab.panelId}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </menu>
        <article
          role="tabpanel"
          id="tab-general"
          hidden={activeTab !== 'general'}
          aria-labelledby="tab-trigger-general"
        >
          <div className={styles.topSection}>
            <div className={styles.logoSection}>
              <img
                src="/assets/user-photo.png"
                alt="Maria Eduarda"
                style={{ width: 48, height: 48, borderRadius: 4, objectFit: 'cover' }}
                draggable={false}
              />
              <div className={styles.brand}>
                <small>Maria Eduarda Silva Viana</small>
                <span className={styles.winLabel}>Eng. Software<em> Jr</em></span>
                <small>Engenharia de Software</small>
              </div>
            </div>
            <hr />
            <div className={styles.info}>
              <p><strong>Maria Eduarda Silva Viana</strong></p>
              <p>Engenheira de Software Júnior</p>
              <br />
              <p>Portfolio v1.1 — madugamer0412</p>
              <p>Build 2026.10.03</p>
            </div>
          </div>

          <fieldset>
            <legend>Sobre Mim</legend>
            <p style={{marginBottom: 8}}>
              Engenheira de Software Júnior com experiência em sistemas em produção, APIs REST,
              correção de bugs e bancos relacionais. Java e Spring Boot em projetos, testes
              unitários, Docker e integração de serviços. Disponível para vaga júnior.
            </p>
            <div className="field-row">
              <label style={{width: 90}}>Localização:</label>
              <span>Goiânia - GO, Brasil</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>Formação:</label>
              <span>Eng. de Software — Faculdade Alfredo Nasser (2023 – dez/2026)</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>E-mail:</label>
              <span>softwaremadu@gmail.com</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>Celular:</label>
              <span>(62) 99240-7797</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>Site:</label>
              <span>maduviana.com.br</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>Idiomas:</label>
              <span>Português (nativo), Inglês intermediário-avançado</span>
            </div>
          </fieldset>
        </article>
        <article
          role="tabpanel"
          id="tab-hw"
          hidden={activeTab !== 'hardware'}
          aria-labelledby="tab-trigger-hardware"
        >
          <fieldset>
            <legend>Avalara (12/2024 – 05/2026)</legend>
            <p style={{ fontSize: 11, marginBottom: 6 }}>Estágio em Engenharia de Software — Remoto · Concluído</p>
            <ul style={{ fontSize: 11, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
              <li>Sistemas em produção: correção de bugs críticos e melhorias contínuas</li>
              <li>APIs REST para integração com serviços externos</li>
              <li>Interfaces web com Angular e JavaScript</li>
              <li>Testes unitários, Docker e acompanhamento das entregas no Jira</li>
            </ul>
          </fieldset>
          <fieldset style={{ marginTop: 8 }}>
            <legend>Oobj (07/2024 – 12/2024)</legend>
            <p style={{ fontSize: 11, marginBottom: 6 }}>Estágio em Engenharia de Software — Remoto · Concluído</p>
            <ul style={{ fontSize: 11, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
              <li>Sistemas fiscais (NFe, NFCe, CT-e e MDFe) e consumo de APIs REST</li>
              <li>Correção de bugs e análise de falhas em produção</li>
              <li>Queries em PostgreSQL e Oracle, com uso de Docker</li>
            </ul>
          </fieldset>
          <fieldset style={{ marginTop: 8 }}>
            <legend>SIGEP (01/2024 – 07/2024)</legend>
            <p style={{ fontSize: 11, marginBottom: 6 }}>Estágio em Infraestrutura de TI — Presencial · Concluído</p>
            <ul style={{ fontSize: 11, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
              <li>Suporte em servidores e redes</li>
              <li>Backup e manutenção de banco de dados</li>
              <li>Monitoramento de segurança</li>
            </ul>
          </fieldset>
        </article>
        <article
          role="tabpanel"
          id="tab-adv"
          hidden={activeTab !== 'advanced'}
          aria-labelledby="tab-trigger-advanced"
        >
          <fieldset>
            <legend>Formação Acadêmica</legend>
            <div className="field-row" style={{ marginBottom: 4 }}>
              <label style={{ width: 90, fontSize: 11 }}>Curso:</label>
              <span style={{ fontSize: 11 }}>Engenharia de Software</span>
            </div>
            <div className="field-row" style={{ marginBottom: 4 }}>
              <label style={{ width: 90, fontSize: 11 }}>Instituição:</label>
              <span style={{ fontSize: 11 }}>Faculdade Alfredo Nasser</span>
            </div>
            <div className="field-row">
              <label style={{ width: 90, fontSize: 11 }}>Período:</label>
              <span style={{ fontSize: 11 }}>2023 — dez/2026 (presencial, noturno)</span>
            </div>
          </fieldset>
          <fieldset style={{ marginTop: 8 }}>
            <legend>Certificações</legend>
            <ul style={{ fontSize: 11, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
              <li>Java — Fundamentos, java.io, Java e JDBC</li>
              <li>Git — Controle de Versão</li>
              <li>Lógica de Programação</li>
            </ul>
          </fieldset>
          <fieldset style={{ marginTop: 8 }}>
            <legend>Destaques</legend>
            <ul style={{ fontSize: 11, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
              <li>Portfólio Madu — React, Context API, custom hooks e CSS Modules</li>
              <li>APIs REST em Java (Spring Boot) e em TypeScript (Node.js, PostgreSQL)</li>
              <li>Atuação em produção: bugs críticos, integrações e interfaces em Angular</li>
            </ul>
          </fieldset>
          <fieldset style={{ marginTop: 8 }}>
            <legend>Soft Skills</legend>
            <div className="field-row" style={{ alignItems: 'center', marginBottom: 6 }}>
              <label style={{ width: 140, fontSize: 11 }}>Comunicação</label>
              <progress max="100" value={90} style={{ flex: 1 }} />
              <span style={{ width: 36, textAlign: 'right', fontSize: 10 }}>90%</span>
            </div>
            <div className="field-row" style={{ alignItems: 'center', marginBottom: 6 }}>
              <label style={{ width: 140, fontSize: 11 }}>Trabalho em equipe</label>
              <progress max="100" value={85} style={{ flex: 1 }} />
              <span style={{ width: 36, textAlign: 'right', fontSize: 10 }}>85%</span>
            </div>
            <div className="field-row" style={{ alignItems: 'center', marginBottom: 6 }}>
              <label style={{ width: 140, fontSize: 11 }}>Resolução de problemas</label>
              <progress max="100" value={88} style={{ flex: 1 }} />
              <span style={{ width: 36, textAlign: 'right', fontSize: 10 }}>88%</span>
            </div>
            <div className="field-row" style={{ alignItems: 'center' }}>
              <label style={{ width: 140, fontSize: 11 }}>Organização</label>
              <progress max="100" value={85} style={{ flex: 1 }} />
              <span style={{ width: 36, textAlign: 'right', fontSize: 10 }}>85%</span>
            </div>
          </fieldset>
        </article>

        <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
          <button type="button" onClick={() => window.open('https://www.linkedin.com/in/madu-viana/', '_blank')}>
            LinkedIn
          </button>
          <button type="button" onClick={() => window.open('https://github.com/maduafk', '_blank')}>
            GitHub
          </button>
          <button type="button" onClick={() => setToast('Obrigada por visitar meu portfolio! 💜')}>
            Sobre
          </button>
        </div>
      </section>
    </div>
  );
}
