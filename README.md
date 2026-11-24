<div align="center">

# Portfolio da Maria Eduarda

### Windows XP no navegador, feito por ela

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000?style=for-the-badge&logo=cssmodules&logoColor=white)
![xp.css](https://img.shields.io/badge/xp.css-008080?style=for-the-badge)

**Autora:** Maria Eduarda Silva Viana (Madu)

Este repositório é um projeto original meu. Eu desenhei a experiência, escrevi os aplicativos e montei o sistema de janelas. Não é template, tema pronto nem fork.

Site no ar: [maduviana.com.br](https://www.maduviana.com.br/)  
GitHub: [github.com/maduafk](https://github.com/maduafk)  
LinkedIn: [linkedin.com/in/madu-viana](https://www.linkedin.com/in/madu-viana/)

</div>

---

## Sobre o projeto

Portfolio pessoal com tema de Windows XP. Não é só um site com visual retrô: liga o PC, passa pela BIOS, carrega o sistema, faz login e cai num desktop interativo.

O Windows XP foi onde eu comecei a mexer com tecnologia, do Paint ao Prompt de Comando. Transformar isso num portfolio foi a forma que eu escolhi de mostrar de onde eu vim.

No celular aparece um aviso. A experiência foi feita para computador. Quem quiser tentar no telefone precisa deixar a tela deitada de verdade.

---

## O que tem nesse Windows XP

O sistema roda no navegador: BIOS → carregamento → login → desktop → desligamento. Tem som de startup, cursores `.cur`, wallpaper Bliss e ícones em PNG.

**Programas que abrem de verdade:**

- Meu Computador, com as minhas informações
- Windows Explorer, com pastas navegáveis
- Bloco de Notas, abrindo um README.txt com a minha história
- WordPad, com o currículo
- Paint, com canvas
- Calculadora
- Prompt de Comando, com `help`, `about`, `skills`, `projects` e `exp`
- Campo Minado jogável
- Media Player, com playlist local
- Chrome, com um site retrô e um Orkut
- MSN Messenger, com conversa e webcam local
- LimeWire, como piada visual de download
- Outlook Express, para contato
- Painel de Controle, com habilidades
- Lixeira
- DOOM, só o Episódio 1 shareware (Knee-Deep in the Dead)

**Detalhes de época:**

- `Minecraft_setup.exe` no desktop dispara uma cascata de erros, um glitch e uma tela azul. É encenação, não é um vírus
- Popup do WinRAR dizendo que o período de avaliação expirou
- Clippy aparecendo para "ajudar"
- Post-its arrastáveis, menu de clique direito e várias janelas com foco

---

## Stack

- React 19 + Vite 8
- [xp.css](https://botoxparty.github.io/XP.css/) 0.2.6, fixado no `index.html`
- CSS Modules
- Canvas no Paint
- Webcam do MSN via `getUserMedia`, só na máquina de quem autoriza
- js-dos para o DOOM shareware, carregado quando a janela abre

---

## Estrutura

```
src/
├── apps/           → cada programa do desktop
├── components/     → desktop, barra, menu iniciar, janela, BIOS, boot
├── context/        → estado compartilhado
└── hooks/          → gerenciador de janelas
```

Cada programa entra em `src/apps/registry.jsx`. O ícone do desktop só pede para abrir essa janela. Arrastar, foco e quem fica na frente ficam no gerenciador, uma vez só.

---

## Rodando localmente

```bash
npm install
npm run dev
```

O DOOM baixa o emulador na primeira vez em que a janela abre, então precisa de internet nesse momento. Os arquivos do jogo ficam em `public/games/`.

---

<div align="center">

Projeto original de **Maria Eduarda Silva Viana**

</div>
