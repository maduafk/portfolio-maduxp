import { useState, useEffect, useCallback, useRef } from 'react';
import { WindowManagerProvider } from './hooks/useWindowManager';
import BiosScreen from './components/BiosScreen/BiosScreen';
import BootScreen from './components/BootScreen/BootScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import Desktop from './components/Desktop/Desktop';
import ShutdownScreen from './components/ShutdownScreen/ShutdownScreen';
import { BSOD } from './components/ShutdownScreen/ShutdownScreen';
import MobileWarning from './components/MobileWarning/MobileWarning';

export default function App() {
  const [screen, setScreen] = useState('bios');
  const startupAudioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/sounds/startup.mp3');
    audio.volume = 0.5;
    audio.preload = 'auto';
    startupAudioRef.current = audio;
  }, []);

  const handleBiosDone = useCallback(() => setScreen('boot'), []);
  const handleBootDone = useCallback(() => {
    setScreen('login');
  }, []);
  const handleLogin = useCallback(() => {
    startupAudioRef.current?.play().catch(() => {});
    setScreen('desktop');
  }, []);
  const handleShutdown = useCallback(() => setScreen('shutdown'), []);
  const handleLoginShutdown = useCallback(() => setScreen('login-shutdown'), []);
  const handleBsod = useCallback(() => setScreen('bsod'), []);
  const handleRestart = useCallback(() => setScreen('bios'), []);

  const renderScreen = () => {
    switch (screen) {
      case 'bios':
        return <BiosScreen onComplete={handleBiosDone} />;
      case 'boot':
        return <BootScreenTimed onComplete={handleBootDone} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onShutdown={handleLoginShutdown} />;
      case 'desktop':
        return (
          <WindowManagerProvider>
            <Desktop onShutdown={handleShutdown} onBsod={handleBsod} />
          </WindowManagerProvider>
        );
      case 'shutdown':
        return <ShutdownScreen onComplete={handleRestart} />;
      case 'login-shutdown':
        return <ShutdownScreen onComplete={() => setScreen('login')} />;
      case 'bsod':
        return <BSOD onClose={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <>
      <MobileWarning />
      {renderScreen()}
    </>
  );
}

function BootScreenTimed({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return <BootScreen />;
}
