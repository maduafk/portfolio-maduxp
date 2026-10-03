import {
  OutlookIcon,
  TerminalIcon,
} from '../assets/icons/icons';

import Chrome from './Chrome/Chrome';
import MSN from './MSN/MSN';
import Explorer from './Explorer/Explorer';
import WordPad from './WordPad/WordPad';
import MediaPlayer from './MediaPlayer/MediaPlayer';
import Calculator from './Calculator/Calculator';
import Minesweeper from './Minesweeper/Minesweeper';
import LimeWire from './LimeWire/LimeWire';
import AboutMe from './AboutMe/AboutMe';
import Skills from './Skills/Skills';
import Contact from './Contact/Contact';
import Notepad from './Notepad/Notepad';
import Paint from './Paint/Paint';
import Terminal from './Terminal/Terminal';
import RecycleBin from './RecycleBin/RecycleBin';
import Doom from './Doom/Doom';

const ChromeIcon = () => (
  <img src="/assets/chrome.png" alt="Chrome" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const MSNIcon = () => (
  <img src="/assets/msn-logo.png" alt="MSN" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const pngIcon = {
  width: 32,
  height: 32,
  objectFit: 'contain',
};

function AppIcon({ src, alt }) {
  return <img src={src} alt={alt} width={32} height={32} draggable={false} style={pngIcon} />;
}

const MediaPlayerIcon = () => <AppIcon src="/assets/media-player.png" alt="Windows Media Player" />;
const CalculatorIcon = () => <AppIcon src="/assets/calculator.png" alt="Calculadora" />;
const MinesweeperIcon = () => <AppIcon src="/assets/minesweeper.png" alt="Campo Minado" />;
const LimeWireIcon = () => <AppIcon src="/assets/limewire.png" alt="LimeWire" />;
const WordPadIcon = () => <AppIcon src="/assets/wordpad.png" alt="WordPad" />;

const ExplorerIcon = () => (
  <img src="/assets/win-explorer.png" alt="Explorer" width="32" height="32" style={{ objectFit: 'contain', transform: 'scale(1.4)' }} draggable={false} />
);

const NotepadIcon = () => (
  <img src="/assets/bloco de notas.png" alt="Bloco de Notas" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const PaintIcon = () => (
  <img src="/assets/pant-icon.png" alt="Paint" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const ControlPanelIcon = () => (
  <img src="/assets/painel-controle.png" alt="Painel de Controle" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const RecycleBinIcon = () => (
  <img src="/assets/recycle-bin.png" alt="Lixeira" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const DoomIcon = () => <AppIcon src="/assets/doom.png" alt="DOOM" />;
const VirusBatIcon = () => <AppIcon src="/assets/setup.png" alt="Instalador do Minecraft" />;

export const appRegistry = [
  {
    id: 'chrome',
    label: 'Google Chrome',
    title: 'Meu Portfólio — Google Chrome',
    description: 'Navegador de Internet',
    icon: <ChromeIcon />,
    component: <Chrome />,
    defaultSize: { width: 750, height: 550 },
  },
  {
    id: 'wordpad',
    label: 'Currículo',
    title: 'Curriculo.rtf — WordPad',
    description: 'Currículo em WordPad',
    icon: <WordPadIcon />,
    component: <WordPad />,
    defaultSize: { width: 600, height: 500 },
  },
  {
    id: 'mediaplayer',
    label: 'Media Player',
    title: 'Windows Media Player',
    description: 'Player de mídia',
    icon: <MediaPlayerIcon />,
    component: <MediaPlayer />,
    defaultSize: { width: 600, height: 420 },
  },
  {
    id: 'msn',
    label: 'MSN Messenger',
    title: 'MSN Messenger',
    description: 'Mensageiro Instantâneo',
    icon: <MSNIcon />,
    component: <MSN />,
    defaultSize: { width: 320, height: 480 },
  },
  {
    id: 'about',
    label: 'Meu Computador',
    title: 'Propriedades do Sistema',
    description: 'Informações sobre mim',
    icon: <img src="/assets/my-computer.png" alt="" width="32" height="32" style={{ width: 32, height: 32 }} />,
    component: <AboutMe />,
    defaultSize: { width: 480, height: 440 },
  },
  {
    id: 'explorer',
    label: 'Meus Documentos',
    title: 'Meus Documentos',
    description: 'Explorar arquivos',
    icon: <ExplorerIcon />,
    component: <Explorer />,
    defaultSize: { width: 680, height: 460 },
  },
  {
    id: 'notepad',
    label: 'README.txt',
    title: 'README.txt — Bloco de Notas',
    description: 'Leia-me',
    icon: <NotepadIcon />,
    component: <Notepad />,
    defaultSize: { width: 500, height: 400 },
  },
  {
    id: 'notepad-empty',
    label: 'Bloco de Notas',
    title: 'Sem título — Bloco de Notas',
    description: 'Editor de texto',
    icon: <NotepadIcon />,
    component: <Notepad initialText="" />,
    defaultSize: { width: 500, height: 400 },
  },
  {
    id: 'virusbat',
    label: 'Minecraft_setup.exe',
    title: 'Minecraft_setup.exe',
    description: 'Instalador do Minecraft',
    icon: <VirusBatIcon />,
    component: null,
    defaultSize: { width: 400, height: 300 },
  },
  {
    id: 'paint',
    label: 'Paint',
    title: 'Sem título — Paint',
    description: 'Galeria de trabalhos',
    icon: <PaintIcon />,
    component: <Paint />,
    defaultSize: { width: 620, height: 480 },
  },
  {
    id: 'skills',
    label: 'Painel de Controle',
    title: 'Painel de Controle',
    description: 'Habilidades técnicas',
    icon: <ControlPanelIcon />,
    component: <Skills />,
    defaultSize: { width: 600, height: 450 },
  },
  {
    id: 'contact',
    label: 'Outlook Express',
    title: 'Nova Mensagem',
    description: 'Entre em contato',
    icon: <OutlookIcon />,
    component: <Contact />,
    defaultSize: { width: 550, height: 400 },
  },
  {
    id: 'calculator',
    label: 'Calculadora',
    title: 'Calculadora',
    description: 'Calculadora do Windows',
    icon: <CalculatorIcon />,
    component: <Calculator />,
    defaultSize: { width: 260, height: 310 },
  },
  {
    id: 'doom',
    label: 'DOOM',
    title: 'DOOM.EXE',
    description: 'Episódio shareware',
    icon: <DoomIcon />,
    component: <Doom />,
    defaultSize: { width: 720, height: 520 },
  },
  {
    id: 'minesweeper',
    label: 'Campo Minado',
    title: 'Campo Minado',
    description: 'Jogo clássico',
    icon: <MinesweeperIcon />,
    component: <Minesweeper />,
    defaultSize: { width: 280, height: 350 },
  },
  {
    id: 'limewire',
    label: 'LimeWire',
    title: 'LimeWire 4.18.8',
    description: 'Downloads P2P',
    icon: <LimeWireIcon />,
    component: <LimeWire />,
    defaultSize: { width: 580, height: 400 },
  },
  {
    id: 'terminal',
    label: 'Prompt de Comando',
    title: 'Prompt de Comando',
    description: 'Terminal interativo',
    icon: <TerminalIcon />,
    component: <Terminal />,
    defaultSize: { width: 650, height: 400 },
  },
  {
    id: 'recyclebin',
    label: 'Lixeira',
    title: 'Lixeira',
    description: 'Itens excluídos',
    icon: <RecycleBinIcon />,
    component: <RecycleBin />,
    defaultSize: { width: 520, height: 380 },
  },
];
