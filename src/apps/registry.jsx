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

const ChromeIcon = () => (
  <img src="/assets/chrome.png" alt="Chrome" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const MSNIcon = () => (
  <img src="/assets/msn-logo.png" alt="MSN" width="32" height="32" style={{ objectFit: 'contain' }} draggable={false} />
);

const MediaPlayerIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
    <rect x="3" y="4" width="26" height="24" rx="3" fill="#1C1C2E"/>
    <circle cx="16" cy="14" r="7" fill="none" stroke="#4A9BD9" strokeWidth="1.5"/>
    <polygon points="14,11 14,17 19,14" fill="#4A9BD9"/>
    <rect x="6" y="24" width="20" height="2" rx="1" fill="#4A9BD9"/>
  </svg>
);

const CalculatorIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
    <rect x="5" y="2" width="22" height="28" rx="2" fill="#ECE9D8" stroke="#808080" strokeWidth="1"/>
    <rect x="7" y="4" width="18" height="6" fill="#9CB8A0" stroke="#808080" strokeWidth="0.5"/>
    <rect x="8" y="12" width="4" height="4" fill="#FFF" stroke="#808080" strokeWidth="0.5"/>
    <rect x="14" y="12" width="4" height="4" fill="#FFF" stroke="#808080" strokeWidth="0.5"/>
    <rect x="20" y="12" width="4" height="4" fill="#D4D0C8" stroke="#808080" strokeWidth="0.5"/>
    <rect x="8" y="18" width="4" height="4" fill="#FFF" stroke="#808080" strokeWidth="0.5"/>
    <rect x="14" y="18" width="4" height="4" fill="#FFF" stroke="#808080" strokeWidth="0.5"/>
    <rect x="20" y="18" width="4" height="4" fill="#D4D0C8" stroke="#808080" strokeWidth="0.5"/>
    <rect x="8" y="24" width="10" height="4" fill="#FFF" stroke="#808080" strokeWidth="0.5"/>
    <rect x="20" y="24" width="4" height="4" fill="#316AC5" stroke="#808080" strokeWidth="0.5"/>
  </svg>
);

const MinesweeperIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
    <rect x="2" y="2" width="28" height="28" rx="2" fill="#C0C0C0" stroke="#808080" strokeWidth="1"/>
    <circle cx="16" cy="16" r="6" fill="#333"/>
    <line x1="16" y1="6" x2="16" y2="10" stroke="#333" strokeWidth="2"/>
    <line x1="16" y1="22" x2="16" y2="26" stroke="#333" strokeWidth="2"/>
    <line x1="6" y1="16" x2="10" y2="16" stroke="#333" strokeWidth="2"/>
    <line x1="22" y1="16" x2="26" y2="16" stroke="#333" strokeWidth="2"/>
    <circle cx="16" cy="16" r="2" fill="#FF0000"/>
  </svg>
);

const LimeWireIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
    <circle cx="16" cy="16" r="13" fill="#7CB342"/>
    <circle cx="16" cy="16" r="8" fill="#FFFFFF" opacity="0.3"/>
    <text x="10" y="21" fontSize="14" fontWeight="bold" fill="#FFFFFF">🍋</text>
  </svg>
);

const WordPadIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
    <rect x="4" y="2" width="24" height="28" rx="1" fill="#FFFFFF" stroke="#808080" strokeWidth="1"/>
    <rect x="4" y="2" width="24" height="6" fill="#245EDC"/>
    <line x1="8" y1="12" x2="24" y2="12" stroke="#000" strokeWidth="0.7"/>
    <line x1="8" y1="16" x2="24" y2="16" stroke="#000" strokeWidth="0.7"/>
    <line x1="8" y1="20" x2="24" y2="20" stroke="#000" strokeWidth="0.7"/>
    <line x1="8" y1="24" x2="18" y2="24" stroke="#000" strokeWidth="0.7"/>
  </svg>
);

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

const VirusBatIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
    <rect x="4" y="2" width="24" height="28" fill="#FFFFFF" stroke="#808080" strokeWidth="1"/>
    <rect x="4" y="2" width="24" height="5" fill="#0C0C0C"/>
    <text x="6" y="6" fontSize="4" fill="#00FF00" fontFamily="monospace">BAT</text>
    <text x="8" y="14" fontSize="5" fill="#FF0000" fontWeight="bold">⚠</text>
    <text x="8" y="20" fontSize="3" fill="#333" fontFamily="monospace">virus</text>
    <text x="8" y="24" fontSize="3" fill="#333" fontFamily="monospace">.bat</text>
  </svg>
);

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
    label: 'virus.bat',
    title: 'virus.bat',
    description: '⚠ Não execute!',
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
