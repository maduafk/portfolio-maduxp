import { useState } from 'react';
import styles from './Chrome.module.css';

const tabs = [
  { id: 'site', label: 'Meu Portfólio', icon: '~' },
  { id: 'orkut', label: 'Orkut', icon: '♥' },
  { id: 'youtube', label: 'YouTube', icon: '▶' },
  { id: 'history', label: 'Histórico', icon: '»' },
];

function scrollRetroTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function RetroSite() {
  return (
    <div className={styles.retroSite}>
      <div className={styles.retroHeader}>
        <h1 className={styles.retroTitle}>★ Maria Eduarda Viana ★</h1>
        <p className={styles.retroSubtitle}>Dev Java Jr · Eng. de Software · maduviana.com.br</p>
        <div className={styles.retroBadges}>
          <span className={styles.badge}>★★★★★</span>
          <span className={styles.badge}>TOP DEVELOPER</span>
          <span className={styles.badgeVisitor}>Visitante #004729</span>
        </div>
      </div>

      <div className={styles.retroNav}>
        <span className={styles.navItem} role="button" tabIndex={0} onClick={() => scrollRetroTo('chrome-retro-inicio')} onKeyDown={(e) => e.key === 'Enter' && scrollRetroTo('chrome-retro-inicio')}>:: Início</span>
        <span className={styles.navItem} role="button" tabIndex={0} onClick={() => scrollRetroTo('chrome-retro-sobre')} onKeyDown={(e) => e.key === 'Enter' && scrollRetroTo('chrome-retro-sobre')}>:: Sobre Mim</span>
        <span className={styles.navItem} role="button" tabIndex={0} onClick={() => scrollRetroTo('chrome-retro-projetos')} onKeyDown={(e) => e.key === 'Enter' && scrollRetroTo('chrome-retro-projetos')}>:: Projetos</span>
        <span className={styles.navItem} role="button" tabIndex={0} onClick={() => scrollRetroTo('chrome-retro-tech')} onKeyDown={(e) => e.key === 'Enter' && scrollRetroTo('chrome-retro-tech')}>:: Habilidades</span>
        <span className={styles.navItem} role="button" tabIndex={0} onClick={() => scrollRetroTo('chrome-retro-blog')} onKeyDown={(e) => e.key === 'Enter' && scrollRetroTo('chrome-retro-blog')}>:: Blog</span>
        <span className={styles.navItem} role="button" tabIndex={0} onClick={() => scrollRetroTo('chrome-retro-cv')} onKeyDown={(e) => e.key === 'Enter' && scrollRetroTo('chrome-retro-cv')}>:: Baixar CV</span>
        <span className={styles.navItem} role="button" tabIndex={0} onClick={() => scrollRetroTo('chrome-retro-contato')} onKeyDown={(e) => e.key === 'Enter' && scrollRetroTo('chrome-retro-contato')}>:: Contato</span>
      </div>

      <div className={styles.retroMarquee} id="chrome-retro-blog">
        <div className={styles.marqueeContent}>
          ★ NOVO: Portfólio atualizado! ★ React — O melhor framework! ★ Projetos em destaque! ★ Disponível para trabalho! ★
        </div>
      </div>

      <div className={styles.retroContent}>
        <div className={styles.retroMain}>
          <div className={styles.retroSection} id="chrome-retro-inicio">
            <div className={styles.retroWelcome}>
              <img src="/assets/user-photo.png" alt="Madu" style={{ width: 64, height: 64, borderRadius: 4, objectFit: 'cover', border: '2px solid #FFD700' }} draggable={false} />
              <div>
                <h2>Bem-vindo ao meu site!</h2>
                <p>
                  Oii! Sou a <strong>Maria Eduarda</strong>, Dev Java Júnior.
                  Cursando Eng. de Software na Faculdade Alfredo Nasser (conclusão em dez/2026).
                  Apaixonada por tecnologia, games e café!
                </p>
              </div>
            </div>
          </div>

          <div className={styles.retroSectionBox} id="chrome-retro-tech">
            <h3 className={styles.sectionTitle}>&gt;&gt; PRINCIPAIS TECNOLOGIAS</h3>
            <div className={styles.techBadges}>
              {['Java', 'Spring Boot', 'Angular', 'APIs REST', 'JavaScript', 'React', 'TypeScript', 'Node.js', 'SQL', 'PostgreSQL', 'Docker', 'Git', 'JUnit'].map(t => (
                <span key={t} className={styles.techBadge}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.retroSectionBox} id="chrome-retro-sobre">
            <h3 className={styles.sectionTitle}>&gt;&gt; SOBRE MIM</h3>
            <p className={styles.retroText}>
              Desenvolvedora Java Júnior com experiência em sistemas em produção, APIs REST,
              Angular, PostgreSQL e Oracle. Estágio na Avalara concluído em julho de 2026
              e na Oobj em dezembro de 2024. Cursando Engenharia de Software na Faculdade
              Alfredo Nasser, com conclusão prevista para dezembro de 2026. Disponível para
              vaga júnior. Inglês intermediário-avançado.
            </p>
          </div>

          <div className={styles.retroSectionBox} id="chrome-retro-projetos">
            <h3 className={styles.sectionTitle}>&gt;&gt; PROJETOS</h3>
            <div className={styles.projectList}>
              <div className={styles.projectItem}>
                <span className={styles.projectIcon}>[*]</span>
                <div>
                  <strong>Portfólio Madu</strong>
                  <p>Este portfólio! React 19 + Vite + xp.css</p>
                </div>
              </div>
              <div className={styles.projectItem}>
                <span className={styles.projectIcon}>[*]</span>
                <div>
                  <strong>API REST - Java</strong>
                  <p>Spring Boot, autenticação, CRUD, SQL</p>
                </div>
              </div>
              <div className={styles.projectItem}>
                <span className={styles.projectIcon}>[*]</span>
                <div>
                  <strong>API REST - TypeScript</strong>
                  <p>Node.js, Express, PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.retroSectionBox} id="chrome-retro-contato">
            <h3 className={styles.sectionTitle}>&gt;&gt; CONTATO</h3>
            <p>E-mail: softwaremadu@gmail.com</p>
            <p>Celular: (62) 99240-7797</p>
            <p>Site: maduviana.com.br</p>
            <p>GitHub: github.com/maduafk</p>
            <p>LinkedIn: linkedin.com/in/madu-viana</p>
          </div>
        </div>

        <div className={styles.retroSidebar}>
          <div className={styles.sideWidget}>
            <h4>Navegação</h4>
            <p>» Projetos</p>
            <p>» Blog Posts</p>
            <p id="chrome-retro-cv">» Baixar CV</p>
            <p>» Contato</p>
          </div>
          <div className={styles.sideWidget}>
            <h4>Visitas</h4>
            <div className={styles.counter}>004729</div>
            <p>visitas desde 2002</p>
          </div>
          <div className={styles.sideWidget}>
            <h4>Certificados</h4>
            <div className={styles.certBadge}>HTML W3C VÁLIDO</div>
            <div className={styles.certBadge}>SSL SEGURO</div>
          </div>
        </div>
      </div>

      <div className={styles.retroFooter}>
        © 2002–2026 Meu Portfólio™ · Melhor visualizado no Internet Explorer 6 em 800×600
      </div>
    </div>
  );
}

function OrkutPage() {
  return (
    <div className={styles.orkutPage}>
      <div className={styles.orkutHeader}>
        <span className={styles.orkutLogo}>orkut</span>
        <div className={styles.orkutHeaderRight}>
          <span className={styles.orkutNav}>Início | Perfil | Página de Recados | Amigos | Comunidades</span>
          <span className={styles.orkutNavSec}>Configurações | Ajuda | Sair</span>
        </div>
      </div>
      <div className={styles.orkutBody}>
        <div className={styles.orkutLeft}>
          <div className={styles.orkutProfile}>
            <img src="/assets/user-photo.png" alt="Madu" style={{ width: 100, height: 100, borderRadius: 2, objectFit: 'cover' }} draggable={false} />
            <h3>Maria Eduarda</h3>
            <p className={styles.orkutGender}>feminino</p>
            <p>Goiânia, GO</p>
            <p>Brasil</p>
          </div>
          <div className={styles.orkutSideLinks}>
            <p>📝 scrapbook</p>
            <p>📸 álbum</p>
            <p>🎬 vídeos</p>
            <p>💌 enviar mensagem</p>
            <p>📝 escrever depoimento</p>
          </div>
        </div>

        <div className={styles.orkutCenter}>
          <div className={styles.orkutStatsBar}>
            <span>📝 48 scraps</span>
            <span>📸 9 fotos</span>
            <span>🎬 0 vídeos</span>
            <span>⭐ 5 fãs</span>
          </div>
          <div className={styles.orkutTabs}>
            <span className={styles.orkutTabActive}>☕ social</span>
            <span className={styles.orkutTabItem}>💼 profissional</span>
            <span className={styles.orkutTabItem}>👤 pessoal</span>
          </div>
          <table className={styles.orkutTable}>
            <tbody>
              <tr><td className={styles.orkutLabel}>sobre mim:</td><td>dev por profissão, gamer nas horas vagas. gosto de café, joguinho e ficar até tarde na internet sem motivo nenhum.</td></tr>
              <tr><td className={styles.orkutLabel}>humor:</td><td>aleatória, memes e kkkkk</td></tr>
              <tr><td className={styles.orkutLabel}>paixões:</td><td>café, código, jogos, música</td></tr>
              <tr><td className={styles.orkutLabel}>profissão:</td><td>dev java júnior</td></tr>
              <tr><td className={styles.orkutLabel}>estuda em:</td><td>Faculdade Alfredo Nasser - Eng. Software</td></tr>
              <tr><td className={styles.orkutLabel}>moda:</td><td>casual, moletom e tênis</td></tr>
              <tr><td className={styles.orkutLabel}>esportes:</td><td>nenhum (só assisto)</td></tr>
              <tr><td className={styles.orkutLabel}>atividades:</td><td>programar, jogar, assistir série, fotografia urbana, fazer listas</td></tr>
            </tbody>
          </table>
          <h4 className={styles.orkutSectionTitle}>recados (15)</h4>
          <div className={styles.orkutScrap}>
            <strong>~ Brubs ★彡</strong> — 14/08/2009 23:41
            <p>MADU vem jogar colheita feliz!! plantei morango e preciso de vizinha kkkk</p>
          </div>
          <div className={styles.orkutScrap}>
            <strong>GuSt4vO_xD</strong> — 12/08/2009 19:02
            <p>vamos fz um sv de mine juntos</p>
          </div>
          <div className={styles.orkutScrap}>
            <strong>♥ Juh Pqna ♥</strong> — 10/08/2009 15:30
            <p>amigaaa me add no buddy poke!! e vem ver meu aquario ta mt bonito 🐠</p>
          </div>
          <div className={styles.orkutScrap}>
            <strong>Luk4s_primo</strong> — 08/08/2009 17:55
            <p>ei madu minha mae deixou eu ir ai sabado bora jogar no pc o dia inteiro</p>
          </div>
          <div className={styles.orkutScrap}>
            <strong>Luk4s_primo</strong> — 02/08/2009 14:23
            <p>madu vc q fez aquela pagininha html com as fotos da gente?? ficou mt da hora ensina eu fazer uma tbm</p>
          </div>
        </div>

        <div className={styles.orkutRight}>
          <div className={styles.orkutFriendsBox}>
            <h4>amigos dela (94)</h4>
            <div className={styles.orkutFriendsGrid}>
              {[
                { name: 'Luciclea', color: '#E74C3C' },
                { name: 'Daniel', color: '#3498DB' },
                { name: 'GuGu', color: '#2ECC71' },
                { name: 'Augusto', color: '#9B59B6' },
                { name: 'Gigi', color: '#E67E22' },
                { name: 'Ana', color: '#1ABC9C' },
                { name: 'Leonardo', color: '#34495E' },
                { name: 'Kelly', color: '#E91E63' },
              ].map(f => (
                <div key={f.name} className={styles.orkutFriend}>
                  <div className={styles.orkutFriendAvatar} style={{ background: f.color }}>{f.name[0]}</div>
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
            <p className={styles.orkutSeeAll}>ver amigos</p>
          </div>
          <div className={styles.orkutCommBox}>
            <h4>comunidades dela (23)</h4>
            <div className={styles.orkutComm}>
              <span>😴</span> Eu odeio acordar cedo
            </div>
            <div className={styles.orkutComm}>
              <span>💻</span> Programadores Anônimos
            </div>
            <div className={styles.orkutComm}>
              <span>☕</span> Viciados em Café
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YouTubePage() {
  return (
    <div className={styles.ytPage}>
      <div className={styles.ytHeader}>
        <span className={styles.ytLogo}><span className={styles.ytLogoBox}>You</span><span className={styles.ytLogoTube}>Tube</span></span>
        <span className={styles.ytHeaderLang}>BR</span>
        <div className={styles.ytSearchBar}>
          <input type="text" defaultValue="minecraft casa moderna tutorial" className={styles.ytSearchInput} readOnly />
          <button type="button" className={styles.ytSearchBtn}>Pesquisar</button>
        </div>
        <div className={styles.ytHeaderRight}>
          <span>Enviar</span>
          <span className={styles.ytHeaderUser}>madugamer13</span>
        </div>
      </div>
      <div className={styles.ytNavBar}>
        <span>+Você</span>
        <span>Pesquisa</span>
        <span>Imagens</span>
        <span>Maps</span>
        <span className={styles.ytNavActive}>YouTube</span>
        <span>Notícias</span>
        <span>Gmail</span>
        <span>Drive</span>
        <span>Mais ▾</span>
      </div>
      <div className={styles.ytContent}>
        <div className={styles.ytMain}>
          <div className={styles.ytPlayer}>
            <img src="/assets/minecraft-thumbnail.png" alt="Minecraft" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} draggable={false} />
            <div className={styles.ytPlayOverlay}>▶</div>
          </div>
          <h3 className={styles.ytTitle}>Minecraft: Como Construir uma Casa Moderna - Tutorial</h3>
          <p className={styles.ytMeta}>1.284.739 visualizações</p>
          <div className={styles.ytChannelRow}>
            <div className={styles.ytChannelAvatar}>J</div>
            <div>
              <strong className={styles.ytChannelName}>JazzGhost</strong>
              <span className={styles.ytChannelSub}>Inscrito ✓</span>
            </div>
            <span className={styles.ytChannelVideos}>342 vídeos</span>
          </div>
          <div className={styles.ytActions}>
            <span>👍 Gostei</span>
            <span>👎 Não gostei</span>
            <span>↗ Compartilhar</span>
            <span>+ Adicionar a</span>
          </div>
          <div className={styles.ytComments}>
            <h4>Comentários (42)</h4>
            <div className={styles.ytComment}>
              <strong>xX_player_Xx</strong> — há 2 horas
              <p>primeiro!!! muito bom o video mano</p>
            </div>
            <div className={styles.ytComment}>
              <strong>craft_lover_2010</strong> — há 5 horas
              <p>quem tá assistindo em 2026 dá like!</p>
            </div>
            <div className={styles.ytComment}>
              <strong>pedrin_games</strong> — há 1 dia
              <p>ficou mt top a casa, vou tentar fazer igual</p>
            </div>
          </div>
        </div>
        <div className={styles.ytSidebar}>
          <h4 className={styles.ytSideTitle}>Sugestões</h4>
          {[
            { title: 'Minecraft: Casa de Madeira Fácil - Tutorial', channel: 'JazzGhost', views: '923.847 visualizações', num: '02', thumb: '/assets/yt-thumb-02.png' },
            { title: 'Minecraft: Mansão Moderna Grande - Tutorial', channel: 'JazzGhost', views: '1.587.321 visualizações', num: '03', thumb: '/assets/yt-thumb-03.png' },
            { title: 'Minecraft: Casa na Árvore - Tutorial Fácil', channel: 'JazzGhost', views: '2.104.558 visualizações', num: '04', thumb: '/assets/yt-thumb-04.png' },
          ].map((v) => (
            <div key={v.num} className={styles.ytSuggestion}>
              <div className={styles.ytSugThumb}>
                <img src={v.thumb} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} draggable={false} />
              </div>
              <div className={styles.ytSugInfo}>
                <p className={styles.ytSugTitle}>{v.title}</p>
                <p className={styles.ytSugChannel}>{v.channel}</p>
                <p className={styles.ytSugViews}>{v.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryPage() {
  const historyItems = [
    { time: '14:32', icon: '🌐', url: 'meuportfolio.com.br', title: 'Meu Portfólio' },
    { time: '14:30', icon: '🟠', url: 'orkut.com.br', title: 'Orkut - Meu Perfil' },
    { time: '14:28', icon: '📧', url: 'mail.google.com', title: 'Gmail — Caixa de Entrada' },
    { time: '13:15', icon: '🍮', url: 'pudim.com.br', title: 'Pudim' },
    { time: '23:47', icon: '🔍', url: 'google.com.br', title: 'como centralizar uma div' },
    { time: '22:10', icon: '🔍', url: 'google.com.br', title: 'como centralizar uma div css' },
    { time: '20:30', icon: '🎵', url: '4shared.com', title: '4shared — músicas download' },
    { time: '16:40', icon: '🔍', url: 'google.com.br', title: 'css vertical align center não funciona' },
    { time: '15:12', icon: '📚', url: 'stackoverflow.com', title: 'StackOverflow — React hooks' },
  ];

  return (
    <div className={styles.historyPage}>
      <h3 className={styles.historyTitle}>Histórico</h3>
      <p className={styles.historyDate}>Hoje — {new Date().toLocaleDateString('pt-BR')}</p>
      {historyItems.map((item, i) => (
        <div key={i} className={styles.historyItem}>
          <span className={styles.historyTime}>{item.time}</span>
          <span className={styles.historyIcon}>{item.icon}</span>
          <div className={styles.historyInfo}>
            <span className={styles.historyUrl}>{item.url}</span>
            <span className={styles.historyPageTitle}>{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const tabContent = {
  site: <RetroSite />,
  orkut: <OrkutPage />,
  youtube: <YouTubePage />,
  history: <HistoryPage />,
};

export default function Chrome() {
  const [openTabIds, setOpenTabIds] = useState(() => tabs.map((t) => t.id));
  const [closedStack, setClosedStack] = useState([]);
  const [activeTab, setActiveTab] = useState('site');
  const [url, setUrl] = useState('https://meuportfolio.com.br');
  const [tabBackStack, setTabBackStack] = useState([]);
  const [tabForwardStack, setTabForwardStack] = useState([]);

  const urls = {
    site: 'https://meuportfolio.com.br',
    orkut: 'https://orkut.com.br/perfil',
    youtube: 'https://youtube.com/watch?v=tutorial',
    history: 'chrome://history',
  };

  const selectTab = (id, { recordHistory = true } = {}) => {
    if (id === activeTab) return;
    if (recordHistory) {
      setTabBackStack((s) => [...s, activeTab]);
      setTabForwardStack([]);
    }
    setActiveTab(id);
    setUrl(urls[id]);
  };

  const handleTabChange = (id) => {
    selectTab(id, { recordHistory: true });
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    if (openTabIds.length <= 1) return;
    setOpenTabIds((ids) => ids.filter((x) => x !== id));
    setClosedStack((s) => [...s, id]);
    setTabBackStack((s) => s.filter((x) => x !== id));
    setTabForwardStack((s) => s.filter((x) => x !== id));
    if (activeTab === id) {
      const remaining = openTabIds.filter((x) => x !== id);
      const next = remaining[0];
      setTabBackStack([]);
      setTabForwardStack([]);
      setActiveTab(next);
      setUrl(urls[next]);
    }
  };

  const newTab = () => {
    if (closedStack.length === 0) {
      window.alert('Todas as abas já estão abertas.');
      return;
    }
    const restored = closedStack[closedStack.length - 1];
    setClosedStack((s) => s.slice(0, -1));
    setOpenTabIds((ids) => (ids.includes(restored) ? ids : [...ids, restored]));
    selectTab(restored, { recordHistory: true });
  };

  const goTabBack = () => {
    if (!tabBackStack.length) return;
    const prev = tabBackStack[tabBackStack.length - 1];
    setTabBackStack((s) => s.slice(0, -1));
    setTabForwardStack((s) => [...s, activeTab]);
    setActiveTab(prev);
    setUrl(urls[prev]);
  };

  const goTabForward = () => {
    if (!tabForwardStack.length) return;
    const next = tabForwardStack[tabForwardStack.length - 1];
    setTabForwardStack((s) => s.slice(0, -1));
    setTabBackStack((s) => [...s, activeTab]);
    setActiveTab(next);
    setUrl(urls[next]);
  };

  const refreshTab = () => {
    const cur = activeTab;
    const other = openTabIds.find((id) => id !== cur);
    if (!other) return;
    setActiveTab(other);
    setUrl(urls[other]);
    setTimeout(() => {
      setActiveTab(cur);
      setUrl(urls[cur]);
    }, 50);
  };

  const openTabsOrdered = openTabIds
    .map((id) => tabs.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <div className={styles.chrome}>
      <div className={styles.tabBar}>
        {openTabsOrdered.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
            <span
              className={styles.tabClose}
              role="presentation"
              onClick={(e) => closeTab(e, tab.id)}
            >
              ✕
            </span>
          </button>
        ))}
        {closedStack.length > 0 && (
          <button type="button" className={styles.tabNew} onClick={newTab}>+</button>
        )}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.navBtns}>
          <button type="button" className={styles.navBtn} onClick={goTabBack}>◀</button>
          <button type="button" className={styles.navBtn} onClick={goTabForward}>▶</button>
          <button type="button" className={styles.navBtn} onClick={refreshTab}>↺</button>
        </div>
        <div className={styles.addressBar}>
          <span className={styles.lockIcon}>🔒</span>
          <input
            className={styles.addressInput}
            value={url}
            readOnly
          />
          <span className={styles.starIcon}>☆</span>
        </div>
        <button type="button" className={styles.menuBtn}>⋮</button>
      </div>

      <div className={styles.page}>
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
