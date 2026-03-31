import { createContext, useContext } from 'react';

const RecycleBinContext = createContext(null);

export function RecycleBinProvider({ children, value }) {
  return (
    <RecycleBinContext.Provider value={value}>
      {children}
    </RecycleBinContext.Provider>
  );
}

export function useRecycleBinState() {
  const ctx = useContext(RecycleBinContext);
  if (!ctx) {
    throw new Error('useRecycleBinState must be used within RecycleBinProvider');
  }
  return ctx;
}
