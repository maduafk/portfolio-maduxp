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
                <span className={styles.winLabel}>Desenvolvedora<em> Jr</em></span>
                <small>Engenharia de Software</small>
              </div>
            </div>
            <hr />
            <div className={styles.info}>
              <p><strong>Maria Eduarda Silva Viana</strong></p>
              <p>Desenvolvedora de Software Júnior</p>
              <br />
              <p>Portfolio v1.0 — madugamer0412</p>
              <p>Build 2026.03.29</p>
            </div>
          </div>

          <fieldset>
            <legend>Sobre Mim</legend>
            <p style={{marginBottom: 8}}>
              Desenvolvedora Backend Java com experiência em sistema fiscal de alta disponibilidade.
              Experiência prática com APIs REST, PostgreSQL, Oracle, AWS e mensageria.
              Sempre buscando aprender e entregar código de qualidade.
            </p>
            <div className="field-row">
              <label style={{width: 90}}>Localização:</label>
              <span>Goiânia - GO, Brasil</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>Formação:</label>
              <span>Engenharia de Software — Faculdade Alfredo Nasser (2023 - 2026)</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>E-mail:</label>
              <span>softwaremadu@gmail.com</span>
            </div>
            <div className="field-row">
              <label style={{width: 90}}>Idiomas:</label>
              <span>Português (nativo), Inglês B2 (leitura técnica diária)</span>
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
            <legend>Oobj – Avalara (07/2024 - 05/2026)</legend>
            <p style={{ fontSize: 11, marginBottom: 6 }}>Estágio em Engenharia de Software — Home Office</p>
            <ul style={{ fontSize: 11, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
              <li>Sistema crítico de emissão de documentos fiscais (NFe, NFCe, CT-e, MDFe) — milhares de docs/dia</li>
              <li>Otimização de queries PostgreSQL/Oracle em relatórios fiscais (JasperReports)</li>
              <li>APIs REST consumidas por clientes enterprise</li>
              <li>Integração direta com SEFAZ e webservices governamentais</li>
              <li>Mensageria JMS/ActiveMQ em ambiente de alta volumetria</li>
              <li>AWS (S3, SQS, SES) e Docker em ambiente de desenvolvimento</li>
              <li>Testes JUnit + SonarQube para qualidade de código</li>
              <li>Produtividade com Cursor AI e Amazon Q (debugging e code review diários)</li>
            </ul>
          </fieldset>
          <fieldset style={{ marginTop: 8 }}>
            <legend>SIGEP (01/2024 – 07/2024)</legend>
            <p style={{ fontSize: 11, marginBottom: 6 }}>Estágio em Infraestrutura de TI — Presencial</p>
            <ul style={{ fontSize: 11, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
              <li>Suporte e manutenção de servidores e infraestrutura de rede</li>
              <li>Monitoramento de segurança e disponibilidade</li>
              <li>Contribuição para redução de chamados recorrentes</li>
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
              <span style={{ fontSize: 11 }}>2023 — Atualmente (noturno)</span>
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
              <li>Portfólio Madu — React 19, 15+ apps funcionais, Canvas API, drag-and-drop</li>
              <li>Otimização de relatórios fiscais com impacto direto em produção</li>
              <li>Evolução para atuação autônoma em tarefas de backend e integração</li>
              <li>Documentação técnica que facilita onboarding de novos membros</li>
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
          <button type="button" onClick={() => window.open('https://www.linkedin.com/in/maria-eduarda-viana-bb271723a/', '_blank')}>
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
