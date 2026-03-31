<div align="center">

# 💾 Portfolio Madu

### Um portfolio web que simula o Windows XP inteiro no navegador

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000?style=for-the-badge&logo=cssmodules&logoColor=white)
![xp.css](https://img.shields.io/badge/xp.css-008080?style=for-the-badge)

</div>

---

## Sobre o projeto

Portfolio pessoal da **Maria Eduarda (Madu)** com tema 100% fiel ao Windows XP. Não é só um site com visual retrô, é a experiência completa: liga o PC, passa pela BIOS, carrega o sistema, faz login e cai num desktop interativo com aplicações que funcionam de verdade.

O Windows XP foi onde tudo começou pra mim na tecnologia, desde abrir o Paint até fuçar no Prompt de Comando sem saber o que tava fazendo. Transformar isso num portfolio pareceu a melhor forma de mostrar de onde eu vim.

---

## O que tem nesse "Windows XP"

O sistema inteiro roda no navegador: BIOS POST → tela de carregamento → login → desktop → desligamento. Tem som de startup, cursores .cur originais, wallpaper Bliss, ícones PNG e tudo mais.

**Apps que funcionam de verdade:**

- Meu Computador (propriedades do sistema com minhas infos)
- Windows Explorer com navegação por pastas
- Bloco de Notas (abre com um README.txt contando minha história)
- Paint com canvas de desenho
- Calculadora
- Prompt de Comando com comandos tipo help, about, skills, projects
- WordPad com formatação
- Campo Minado jogável
- Media Player com playlist
- Chrome abrindo o Orkut com recados de 2009
- MSN Messenger com chat e webcam (WebRTC)
- LimeWire com downloads de Justin Bieber e Restart
- Outlook Express pra contato
- Painel de Controle com minhas skills
- Lixeira funcional

**Easter eggs:**

- virus.bat que gera cascata de erros → glitch na tela → BSOD
- Popup do WinRAR "período de avaliação expirou"
- Clippy aparecendo pra "ajudar"
- Post-its arrastáveis, menu de clique direito, múltiplas janelas com foco

---

## Stack

- React 19 + Vite 8
- xp.css (componentes visuais do Windows XP)
- CSS Modules
- HTML5 Canvas pro Paint
- WebRTC pra webcam do MSN

---

## Estrutura

```
src/
├── apps/           → cada app do desktop (AboutMe, Calculator, Chrome, Paint, etc)
├── components/     → sistema (Desktop, Taskbar, StartMenu, Window, BIOS, Boot...)
├── context/        → contextos React
└── hooks/          → hooks customizados
```

---

## Rodando localmente

```bash
npm install
npm run dev
```

---

<div align="center">

Feito com nostalgia por **Madu** 💙

</div>
