const pngIcon = {
  width: 32,
  height: 32,
  objectFit: 'contain',
};

export const OutlookIcon = () => (
  <img src="/assets/outlook-express.png" alt="Outlook Express" draggable={false} style={pngIcon} />
);

export const TerminalIcon = () => (
  <img src="/assets/command-prompt.png" alt="Prompt de Comando" draggable={false} style={pngIcon} />
);
