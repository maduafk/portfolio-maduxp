import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './MSNNotification.module.css';

const CONTACTS = [
  '~ Brubs ★彡',
  'GuSt4vO_xD',
  '♥ Juh Pqna ♥',
  'ThiagO_Dev01',
  'Turma do 3ºB',
];

const MESSAGES = [
  'eae madu!! ta on??',
  'bora cs agora!!',
  'vc viu meu flog novo??',
  'kkkkkkk mano',
  'ta on? chama la',
  'vem no msn, preciso falar ctg',
  'madu!! cadê vc??',
  'olha oq o thiago mandou kkkk',
  'amanha tem prova lembra??',
  'manda aquele link dnv',
  'to no cyber, bora jogar',
  'vc fez a tarefa??',
  'fala ai sumida!!',
  '*nudge* 🔔',
  'preciso de ajuda no codigo 🙏',
];

function randomDelayMs() {
  return 15000 + Math.random() * 10000;
}

const EXIT_MS = 350;

export default function MSNNotification({ onOpenMSN }) {
  const [payload, setPayload] = useState(null);
  const [exiting, setExiting] = useState(false);
  const timersRef = useRef({ schedule: null, dismiss: null, exit: null });
  const onOpenMSNRef = useRef(onOpenMSN);
  onOpenMSNRef.current = onOpenMSN;

  const clearTimers = useCallback(() => {
    const { schedule, dismiss, exit } = timersRef.current;
    if (schedule != null) clearTimeout(schedule);
    if (dismiss != null) clearTimeout(dismiss);
    if (exit != null) clearTimeout(exit);
    timersRef.current = { schedule: null, dismiss: null, exit: null };
  }, []);

  const scheduleNextRef = useRef(null);

  const finishExitAndSchedule = useCallback(() => {
    setPayload(null);
    setExiting(false);
    scheduleNextRef.current?.();
  }, []);

  const startExit = useCallback(() => {
    setExiting(true);
    timersRef.current.exit = setTimeout(() => {
      timersRef.current.exit = null;
      finishExitAndSchedule();
    }, EXIT_MS);
  }, [finishExitAndSchedule]);

  const showNotification = useCallback(() => {
    const contact = CONTACTS[Math.floor(Math.random() * CONTACTS.length)];
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setPayload({ contact, message });
    setExiting(false);

    timersRef.current.dismiss = setTimeout(() => {
      timersRef.current.dismiss = null;
      startExit();
    }, 5000);
  }, [startExit]);

  const scheduleNext = useCallback(() => {
    timersRef.current.schedule = setTimeout(() => {
      timersRef.current.schedule = null;
      showNotification();
    }, randomDelayMs());
  }, [showNotification]);

  scheduleNextRef.current = scheduleNext;

  useEffect(() => {
    timersRef.current.schedule = setTimeout(() => {
      timersRef.current.schedule = null;
      showNotification();
    }, randomDelayMs());

    return () => {
      clearTimers();
    };
  }, [showNotification, clearTimers]);

  const handleClose = (e) => {
    e.stopPropagation();
    clearTimers();
    if (payload) startExit();
  };

  const handleBodyClick = () => {
    clearTimers();
    onOpenMSNRef.current?.();
    if (payload) startExit();
  };

  if (!payload && !exiting) {
    return null;
  }

  const { contact, message } = payload || { contact: '', message: '' };

  return (
    <div className={styles.wrapper} aria-live="polite">
      <div className={`${styles.popup} ${exiting ? styles.exiting : ''}`}>
        <div className={styles.header}>
          <img src="/assets/msn-logo.png" alt="" width="16" height="16" style={{ objectFit: 'contain' }} draggable={false} />
          <span className={styles.title}>MSN Messenger</span>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Fechar"
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        <div
          className={styles.body}
          role="button"
          tabIndex={0}
          onClick={handleBodyClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBodyClick();
            }
          }}
        >
          <p className={styles.preview}>
            <span className={styles.contact}>{contact}</span>
            {' diz: '}
            <span className={styles.message}>{message}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
