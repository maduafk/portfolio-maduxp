# Portfolio Windows XP - madugamer0412

Portfolio web com tema 100% fiel ao Windows XP, simulando a experiência completa do sistema operacional: BIOS POST, tela de carregamento, login, desktop interativo com múltiplas aplicações funcionais.

## Como rodar em outro PC

### Pré-requisitos

- **Node.js** v18+ (testado com v20.20.1)
- **npm** (vem junto com o Node.js)

### Passo a passo

```bash
# 1. Clone ou copie a pasta do projeto para o novo PC

# 2. Abra o terminal na pasta do projeto e instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador o endereço que aparecer (geralmente http://localhost:5173)
```

### Outros comandos úteis

```bash
npm run build     # Gera a versão de produção na pasta dist/
npm run preview   # Visualiza a versão de produção localmente
npm run lint      # Verifica erros de código
```

## Estrutura do projeto

```
portfolio/
├── public/
│   ├── assets/          # Imagens (logos, ícones, foto de perfil)
│   ├── sounds/          # Sons do sistema (startup.mp3)
│   └── music/           # Músicas para o Media Player (track01.mp3, track02.mp3...)
├── src/
│   ├── apps/            # Aplicações do "Windows XP"
│   │   ├── AboutMe/     # Meu Computador (propriedades do sistema / sobre mim)
│   │   ├── Calculator/  # Calculadora funcional
│   │   ├── Chrome/      # Navegador com abas e navegação
│   │   ├── Contact/     # Outlook Express (formulário de contato)
│   │   ├── Explorer/    # Windows Explorer (Meus Documentos)
│   │   ├── InternetExplorer/ # Internet Explorer
│   │   ├── LimeWire/    # LimeWire (downloads simulados)
│   │   ├── MediaPlayer/ # Windows Media Player (player de música funcional)
│   │   ├── Minesweeper/ # Campo Minado jogável
│   │   ├── MSN/         # MSN Messenger (chat com histórico)
│   │   ├── Notepad/     # Bloco de Notas funcional
│   │   ├── Paint/       # Paint com canvas para desenho
│   │   ├── Projects/    # Meus Projetos (portfolio)
│   │   ├── RecycleBin/  # Lixeira
│   │   ├── Skills/      # Painel de Controle (habilidades)
│   │   ├── Terminal/    # Prompt de Comando
│   │   ├── WordPad/     # WordPad com formatação
│   │   └── registry.jsx # Registro central de todos os apps
│   ├── components/      # Componentes do sistema
│   │   ├── BiosScreen/  # Tela de BIOS (American Megatrends)
│   │   ├── BootScreen/  # Tela de carregamento do Windows XP
│   │   ├── Desktop/     # Desktop com ícones arrastáveis
│   │   ├── Icons/       # Ícones do desktop
│   │   ├── LoginScreen/ # Tela de login (clique para entrar)
│   │   ├── MSNNotification/ # Notificações popup do MSN
│   │   ├── ShutdownScreen/  # Desligamento + Tela Azul (BSOD)
│   │   ├── StartMenu/   # Menu Iniciar
│   │   ├── StickyNotes/ # Post-its arrastáveis
│   │   ├── Taskbar/     # Barra de tarefas
│   │   └── Window/      # Gerenciador de janelas
│   ├── context/         # Contextos React (Lixeira, Janelas)
│   └── assets/          # Ícones SVG internos
└── index.html
```

## Arquivos que você precisa fornecer

### Foto de perfil
Substitua `public/assets/user-photo.png` pela sua foto. Recomendado: imagem quadrada (200x200px).

Essa foto aparece na:
- Tela de login
- Menu Iniciar
- MSN Messenger

### Som de inicialização
Coloque o som clássico do Windows XP em `public/sounds/startup.mp3`.

### Músicas do Media Player
Coloque arquivos `.mp3` em `public/music/` nomeados como:
- `track01.mp3`
- `track02.mp3`
- `track03.mp3`
- ... e assim por diante

---

## O que ainda precisa ser feito

### Prioridade alta
- [ ] **Substituir foto de perfil** — O arquivo `public/assets/user-photo.png` é um placeholder. Substituir pela sua foto real
- [ ] **Adicionar som de startup** — Colocar `startup.mp3` em `public/sounds/`
- [ ] **Conteúdo do "Sobre Mim"** — Atualizar `src/apps/AboutMe/AboutMe.jsx` com suas informações pessoais reais (nome, formação, experiência, especificações do "sistema")
- [ ] **Conteúdo dos Projetos** — Atualizar `src/apps/Projects/Projects.jsx` com seus projetos reais, links do GitHub, descrições
- [ ] **Conteúdo das Skills** — Atualizar `src/apps/Skills/Skills.jsx` com suas habilidades reais e níveis de proficiência
- [ ] **Informações de Contato** — Atualizar `src/apps/Contact/Contact.jsx` com seu email real

### Prioridade média
- [ ] **Wallpaper do desktop** — Adicionar o papel de parede clássico "Bliss" do Windows XP como background do desktop
- [ ] **Cursor do mouse** — Usar cursores clássicos do Windows XP (seta, ampulheta, mão)
- [ ] **Sons de interação** — Adicionar sons de clique, erro, notificação, etc. do Windows XP
- [ ] **Fontes** — Adicionar a fonte Tahoma original para fidelidade extra
- [ ] **Responsividade** — Ajustar para funcionar bem em telas menores / tablets
- [ ] **Músicas no Media Player** — Adicionar músicas `.mp3` em `public/music/`

### Prioridade baixa (melhorias extras)
- [ ] **Deploy** — Publicar no Vercel, Netlify ou GitHub Pages
- [ ] **Animações de janela** — Adicionar animação de minimizar/maximizar como no XP real
- [ ] **Tela de desligamento** — Melhorar animação do "Desligando..."
- [ ] **Relógio do sistema** — Mostrar calendário ao clicar no relógio da taskbar
- [ ] **Menu de contexto** — Clique direito no desktop mostrando opções (Atualizar, Propriedades, Novo, etc.)
- [ ] **Múltiplos papéis de parede** — Opção de trocar wallpaper nas propriedades do desktop
- [ ] **Barra de Início Rápido** — Ícones de acesso rápido ao lado do botão Iniciar
- [ ] **Tray icons animados** — Volume, rede, relógio com funcionalidades
- [ ] **Easter egg do Clippy** — Assistente do Office aparecendo aleatoriamente
- [ ] **WinRAR popup** — "Seu período de avaliação expirou" clássico

---

## Stack

- **React 19** + **Vite 8**
- **xp.css** — Biblioteca CSS que replica componentes visuais do Windows XP
- **CSS Modules** — Estilização isolada por componente
- **HTML5 Canvas** — Usado no Paint para desenho
- **WebRTC** — Usado na webcam do MSN Messenger
