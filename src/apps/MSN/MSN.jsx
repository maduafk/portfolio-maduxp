import { useState, useRef, useEffect } from 'react';
import styles from './MSN.module.css';

const initialContacts = [
  { id: 1, name: '~ PrImA GaBi ★彡', status: '🟢', statusText: '♪ eu sou a dOrA aventureira ♪', emoji: '👧' },
  { id: 2, name: 'GuGu_GaMeR2005', status: '🟢', statusText: 'jogando club penguin 🐧', emoji: '🎮' },
  { id: 3, name: '♥ LuLu PiNk ♥', status: '🟢', statusText: '~* princesas disney *~', emoji: '💖' },
  { id: 5, name: 'Turma da Escola', status: '🟡', statusText: 'grupo - 5 online', emoji: '👥' },
];

const initialChatHistory = {
  1: [
    { from: 'them', text: 'oiii maduu', time: '15:32' },
    { from: 'me', text: 'oiii gabiii', time: '15:32' },
    { from: 'them', text: 'vc viu o desenho hj?? bob esponja tava mto engrasado', time: '15:33' },
    { from: 'me', text: 'simmmm kkkkk o patrick e mto burro', time: '15:33' },
    { from: 'them', text: 'kkkkkk demais', time: '15:33' },
    { from: 'me', text: 'gabi vc quer jogar stardoll cmg??', time: '15:34' },
    { from: 'them', text: 'querooo!! mas minha mae disse q so posso ficar ate 5 hora no pc', time: '15:34' },
    { from: 'me', text: 'a minha tbm 😭😭', time: '15:35' },
    { from: 'them', text: 'entao vamo logo!!! entra la', time: '15:35' },
    { from: 'me', text: 'to entrando esperaaa', time: '15:36' },
  ],
  2: [
    { from: 'them', text: 'MADUUU', time: '16:01' },
    { from: 'them', text: 'ENTRA NO CLUB PENGUIN', time: '16:01' },
    { from: 'me', text: 'calma to terminando a liçao de casa', time: '16:02' },
    { from: 'them', text: 'rapido!! vai ter festa no iglu do joao', time: '16:02' },
    { from: 'them', text: 'tem pizza de graça la', time: '16:02' },
    { from: 'me', text: 'aaaaa ja to indo', time: '16:03' },
    { from: 'them', text: 'entra no servidor neve!!', time: '16:03' },
    { from: 'me', text: 'to carregando... a internet ta lerda', time: '16:04' },
    { from: 'them', text: 'hj eu vou comprar o puffle rosa 😍', time: '16:04' },
    { from: 'me', text: 'eu quero o azul mas n tenho moeda suficiente 😭', time: '16:05' },
    { from: 'them', text: 'joga aquele jogo da pesca q da bastante moeda', time: '16:05' },
  ],
  3: [
    { from: 'them', text: 'oiii madu!! 💕', time: '14:15' },
    { from: 'me', text: 'oiii lulu!! td bem?', time: '14:16' },
    { from: 'them', text: 'tdbn!! vc ja viu o filme da barbie novo?? o das fadas', time: '14:16' },
    { from: 'me', text: 'aindaa naoo!! quero mtooo ver', time: '14:17' },
    { from: 'them', text: 'e mtooo linddoo a barbie vira uma fada com asa rosa', time: '14:17' },
    { from: 'me', text: 'aaaa quero assistir!! vou pedir pra minha mae alugar na locadora', time: '14:18' },
    { from: 'them', text: 'pede simm!! dps a gnt assiste junto na sua casa', time: '14:18' },
    { from: 'me', text: 'simmm e a gnt faz pipoca 🍿', time: '14:19' },
    { from: 'them', text: 'amanha na escola vc me empresta o lapis de cor rosa??', time: '14:19' },
    { from: 'me', text: 'ta bom!! mas n perde pq minha mae briga 😤', time: '14:20' },
    { from: 'them', text: 'kkkk prometo q n perdo 🤞', time: '14:20' },
  ],
  5: [
    { from: 'them', text: '[Turma da Escola] gente alguem fez o dever de casa??', time: '15:30' },
    { from: 'me', text: 'qual dever??', time: '15:31' },
    { from: 'them', text: '[GuGu_GaMeR2005] aquele de recortar e colar do livro', time: '15:31' },
    { from: 'them', text: '[♥ LuLu PiNk ♥] eu fiz!! ficou bonito colei com glitter ✨', time: '15:32' },
    { from: 'me', text: 'ai eu esqueci!! minha mae vai me matar 😭', time: '15:32' },
    { from: 'them', text: '[♥ LuLu PiNk ♥] faz agora rapido!!', time: '15:33' },
    { from: 'them', text: '[~ PrImA GaBi ★彡] eu nem trouxe o livro pra casa 💀', time: '15:33' },
    { from: 'me', text: 'kkkkkk gabi vc nunca traz nada', time: '15:34' },
    { from: 'them', text: '[~ PrImA GaBi ★彡] 😤 nao e vdd', time: '15:34' },
    { from: 'them', text: '[GuGu_GaMeR2005] gente para de conversar e vamo jogar friv', time: '15:35' },
    { from: 'me', text: 'BORA!! quero jogar aquele do pinguim q voa', time: '15:35' },
  ],
};

const STATUS_OPTIONS = [
  { value: 'avail', label: '🟢 Disponível', display: '🟢 Disponível' },
  { value: 'busy', label: '🟡 Ocupado', display: '🟡 Ocupado' },
  { value: 'away', label: '🔴 Ausente', display: '🔴 Ausente' },
  { value: 'invis', label: '⚫ Invisível', display: '⚫ Invisível' },
];

const PICKER_EMOJIS = [':)', ':D', 'XD', ':P', ';)', ':(', ':O', '<3', ':S', '\\o/', '=)', 'o.O', '^^', 'T_T', ':B', 'n_n'];

const autoReplies = [
  'kkkkkkk',
  'serio?? 😂',
  'legal!!',
  'ata',
  'tbm quero!!',
  'minha mae n deixa 😭',
  'vamo jogar!!',
  'perai to voltando',
  'kkkk boa',
  'sim sim',
  'naooo kkkk',
  'tbm acho',
  'amanha na escola a gnt conversa',
  'ta bom',
  '*nudge* 🔔',
  'aaaa q legal kkkk',
  'meu pc travou dnv 😤',
  'espera minha mae ta chamando',
];

function WebcamPopup({ contactName, webcamError, setWebcamError, webcamVideoRef, webcamStreamRef, onClose }) {
  useEffect(() => {
    let cancelled = false;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        webcamStreamRef.current = stream;
        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        if (!cancelled) setWebcamError(true);
      });
    return () => { cancelled = true; };
  }, [webcamVideoRef, webcamStreamRef, setWebcamError]);

  return (
    <div className={styles.webcamOverlay}>
      <div className={styles.webcamWindow}>
        <div className={styles.webcamTitleBar}>
          <span>🦋 MSN Webcam — {contactName}</span>
          <button type="button" className={styles.webcamClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.webcamBody}>
          <div className={styles.webcamScreen}>
            {webcamError ? (
              <>
                <span className={styles.webcamX}>✕</span>
                <p className={styles.webcamErrorText}>Webcam não autorizada</p>
                <p className={styles.webcamSub}>O contato não vai conseguir te ver!</p>
              </>
            ) : (
              <video ref={webcamVideoRef} autoPlay muted playsInline className={styles.webcamVideo} />
            )}
          </div>
        </div>
        <div className={styles.webcamFooter}>
          <span className={styles.webcamDot}>●</span> {webcamError ? 'Sem webcam' : 'Webcam ativa'}
          <span className={styles.webcamFooterRight}>MSN Messenger — Chamada de vídeo</span>
        </div>
      </div>
    </div>
  );
}

export default function MSN() {
  const newContactIdRef = useRef(100);
  const [contacts, setContacts] = useState(initialContacts);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState(() => {
    const copy = {};
    for (const [k, v] of Object.entries(initialChatHistory)) {
      copy[k] = [...v];
    }
    return copy;
  });
  const [input, setInput] = useState('');
  const [myStatus, setMyStatus] = useState(STATUS_OPTIONS[0]);
  const [shakeChat, setShakeChat] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamError, setWebcamError] = useState(false);
  const webcamVideoRef = useRef(null);
  const webcamStreamRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeChat]);

  useEffect(() => {
    if (!shakeChat) return undefined;
    const t = setTimeout(() => setShakeChat(false), 500);
    return () => clearTimeout(t);
  }, [shakeChat]);

  const sendMessage = () => {
    if (!input.trim() || !activeChat) return;
    const contactId = activeChat.id;
    setChatMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []),
        { from: 'me', text: input, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
      ],
    }));
    setInput('');

    setTimeout(() => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setChatMessages(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []),
          { from: 'them', text: reply, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
        ],
      }));
    }, 1500 + Math.random() * 2000);
  };

  const handleNudge = () => {
    if (!activeChat) return;
    setShakeChat(true);
    const contactId = activeChat.id;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []),
        { from: 'nudge', text: 'Você enviou um zumbido!', time: now },
      ],
    }));
    setTimeout(() => {
      setShakeChat(true);
      setChatMessages(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []),
          { from: 'nudge-them', text: `${activeChat.name} enviou um zumbido!`, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
        ],
      }));
    }, 2000 + Math.random() * 2000);
  };

  const insertEmoji = (emoji) => {
    setInput((v) => v + emoji);
    setShowEmojiPicker(false);
  };

  const addContact = () => {
    const n = Math.floor(Math.random() * 900) + 100;
    const id = newContactIdRef.current++;
    setContacts((list) => [
      ...list,
      { id, name: `Novo Contato ${n}`, status: '🟢', statusText: 'disponível', emoji: '👤' },
    ]);
  };

  if (activeChat) {
    const messages = chatMessages[activeChat.id] || [];
    return (
      <div className={`${styles.chatWindow} ${shakeChat ? styles.shake : ''}`}>
        <div className={styles.chatHeader}>
          <button type="button" className={styles.backBtn} onClick={() => setActiveChat(null)}>◀</button>
          <span className={styles.chatName}>{activeChat.name}</span>
          <div className={styles.chatActions}>
            <span>📁</span>
            <span role="button" tabIndex={0} onClick={() => setShowWebcam(true)} onKeyDown={(e) => e.key === 'Enter' && setShowWebcam(true)}>📷</span>
            <span>🎤</span>
            <span>🎮</span>
            <span role="button" tabIndex={0} onClick={handleNudge} onKeyDown={(e) => e.key === 'Enter' && handleNudge()}>🔔</span>
          </div>
        </div>
        <div className={styles.chatBody}>
          <p className={styles.chatWarning}>
            ⚠ Nunca compartilhe sua senha ou número de cartão de crédito em conversas.
          </p>
          {messages.map((msg, i) => (
            msg.from === 'nudge' || msg.from === 'nudge-them' ? (
              <div key={i} className={styles.nudgeMsg}>
                {msg.text}
              </div>
            ) : (
              <div key={i} className={msg.from === 'me' ? styles.msgMe : styles.msgThem}>
                <span className={styles.msgAuthor}>
                  {msg.from === 'me' ? 'Eu' : activeChat.name} diz:
                </span>
                <span className={styles.msgText}>{msg.text}</span>
              </div>
            )
          ))}
          <div ref={bottomRef} />
        </div>
        <div className={styles.chatInput}>
          <div className={styles.chatFormat}>
            <span>🅰 Fonte</span>
            <span className={styles.chatFormatEmojiWrap}>
              <span
                role="button"
                tabIndex={0}
                onClick={() => setShowEmojiPicker((v) => !v)}
                onKeyDown={(e) => e.key === 'Enter' && setShowEmojiPicker((v) => !v)}
              >
                😊
              </span>
              {showEmojiPicker && (
                <div className={styles.emojiPicker}>
                  {PICKER_EMOJIS.map((em) => (
                    <button
                      key={em}
                      type="button"
                      className={styles.emojiPickerBtn}
                      onClick={() => insertEmoji(em)}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </span>
          </div>
          <div className={styles.chatInputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="mensagem..."
            />
            <button type="button" className={styles.sendBtn} onClick={sendMessage}>Enviar</button>
          </div>
        </div>
        {showWebcam && (
          <WebcamPopup
            contactName={activeChat.name}
            webcamError={webcamError}
            setWebcamError={setWebcamError}
            webcamVideoRef={webcamVideoRef}
            webcamStreamRef={webcamStreamRef}
            onClose={() => {
              if (webcamStreamRef.current) {
                webcamStreamRef.current.getTracks().forEach(t => t.stop());
                webcamStreamRef.current = null;
              }
              setShowWebcam(false);
              setWebcamError(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.myProfile}>
          <img src="/assets/user-photo.png" alt="" className={styles.myAvatarImg} draggable={false} />
          <div>
            <span className={styles.myName}>~* MaDu_GaMeR_2008 *~</span>
            <span className={styles.myStatus}>{myStatus.display}</span>
            <span className={styles.myAge}>eu com 6 anos no msn da minha mãe</span>
          </div>
        </div>
        <div className={styles.statusSelect}>
          <select
            className={styles.statusDropdown}
            value={myStatus.value}
            onChange={(e) => {
              const opt = STATUS_OPTIONS.find((o) => o.value === e.target.value);
              if (opt) setMyStatus(opt);
            }}
            aria-label="Status"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.toolbar}>
        <span>😊</span>
        <span>🎮</span>
        <span>🌐</span>
        <span>🎭</span>
        <span>⚙️</span>
        <span>❓</span>
      </div>

      <div className={styles.contactList}>
        <div className={styles.group}>
          <span className={styles.groupTitle}>▼ Online ({contacts.filter(c => c.status === '🟢').length})</span>
          {contacts.filter(c => c.status === '🟢').map((c) => (
            <button
              key={c.id}
              type="button"
              className={styles.contact}
              onClick={() => setActiveChat(c)}
            >
              <span className={styles.contactEmoji}>{c.emoji}</span>
              <div className={styles.contactInfo}>
                <span className={styles.contactName}>{c.name}</span>
                <span className={styles.contactStatus}>{c.statusText}</span>
              </div>
            </button>
          ))}
        </div>
        <div className={styles.group}>
          <span className={styles.groupTitle}>▼ Ocupado ({contacts.filter(c => c.status === '🟡').length})</span>
          {contacts.filter(c => c.status === '🟡').map((c) => (
            <button
              key={c.id}
              type="button"
              className={styles.contact}
              onClick={() => setActiveChat(c)}
            >
              <span className={styles.contactEmoji}>{c.emoji}</span>
              <div className={styles.contactInfo}>
                <span className={styles.contactName}>{c.name}</span>
                <span className={styles.contactStatus}>{c.statusText}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.footerBtn} onClick={addContact}>+ Adicionar contato</button>
        <span>MSN® 9.0</span>
      </div>
    </div>
  );
}
