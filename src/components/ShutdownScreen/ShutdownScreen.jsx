import { useState, useEffect } from 'react';
import styles from './ShutdownScreen.module.css';

export default function ShutdownScreen({ onComplete }) {
  const [phase, setPhase] = useState('saving');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('shutdown'), 2000);
    const t2 = setTimeout(() => onComplete?.(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className={styles.screen}>
      <div className={styles.center}>
        <img
          src="/assets/xp-logo.png"
          alt="Windows XP"
          className={styles.logo}
          draggable={false}
        />
        <p className={styles.mainText}>
          O Windows está sendo desligado...
        </p>
        <p className={styles.subText}>
          {phase === 'saving' ? 'Salvando suas configurações...' : ''}
        </p>
        <div className={styles.loadingBar}>
          <div className={styles.track}>
            <div className={styles.blocksContainer}>
              <div className={styles.block} />
              <div className={styles.block} />
              <div className={styles.block} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BSOD({ onClose }) {
  return (
    <div className={styles.bsod} onClick={onClose}>
      <pre className={styles.bsodText}>{`
 A problem has been detected and Windows has been shut down to prevent
 damage to your computer.

 IRQL_NOT_LESS_OR_EQUAL

 If this is the first time you've seen this Stop error screen,
 restart your computer. If this screen appears again, follow
 these steps:

 Check to make sure any new hardware or software is properly installed.
 If this is a new installation, ask your hardware or software manufacturer
 for any Windows updates you might need.

 If problems continue, disable or remove any newly installed hardware
 or software. Disable BIOS memory options such as caching or shadowing.

 Technical information:

 *** STOP: 0x0000000A (0x00000004, 0x00000002, 0x00000000, 0x80501B38)
 *** php.exe - Address 0xC0507A12 base at 0xC0500000, DateStamp 3ee32acc

 Beginning dump of physical memory...
 Physical memory dump complete.

 (Clique para sair)`}</pre>
    </div>
  );
}
