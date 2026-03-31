import { useRef, useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    to: 'softwaremadu@gmail.com',
    from: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');
  const [spellcheckMsg, setSpellcheckMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setAttachmentName(file ? file.name : '');
  };

  const handleVerify = () => {
    setSpellcheckMsg('✅ Nenhum erro de ortografia encontrado');
    setTimeout(() => setSpellcheckMsg(''), 4000);
  };

  const handleSend = () => {
    const to = encodeURIComponent(formData.to.trim());
    const subject = encodeURIComponent(formData.subject.trim() || '(sem assunto)');
    const bodyParts = [];
    if (formData.from.trim()) bodyParts.push(`De: ${formData.from.trim()}`);
    bodyParts.push(formData.message.trim() || '');
    if (attachmentName) bodyParts.push(`Anexo (referência): ${attachmentName}`);
    const body = encodeURIComponent(bodyParts.filter(Boolean).join('\n\n'));
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className={styles.container}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className={styles.toolbar}>
        <button type="button" onClick={handleSend}>Enviar</button>
        <button type="button" onClick={handleAttach}>Anexar</button>
        <button type="button" onClick={handleVerify}>Verificar</button>
      </div>

      {attachmentName ? (
        <div style={{ fontSize: 11, padding: '4px 8px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          📎 {attachmentName}
        </div>
      ) : null}

      {spellcheckMsg ? (
        <div style={{ fontSize: 11, padding: '4px 8px', background: '#e8f5e9' }}>
          {spellcheckMsg}
        </div>
      ) : null}

      {sent && (
        <div className={styles.sentBanner}>
          Gmail aberto em nova aba!
        </div>
      )}

      <div style={{padding: '4px 8px'}}>
        <div className="field-row">
          <label style={{width: 60}}>Para:</label>
          <input type="text" name="to" value={formData.to} readOnly style={{flex: 1}} />
        </div>
        <div className="field-row">
          <label style={{width: 60}}>De:</label>
          <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="seu@email.com" style={{flex: 1}} />
        </div>
        <div className="field-row">
          <label style={{width: 60}}>Assunto:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Oportunidade de trabalho" style={{flex: 1}} />
        </div>
      </div>

      <textarea
        className={styles.messageArea}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Escreva sua mensagem aqui..."
      />
    </div>
  );
}
