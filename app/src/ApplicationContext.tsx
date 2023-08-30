import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface AppState {
  menuBarHidden: boolean;
  menuSelectedIndex: number;
  isMaximised: boolean;
};

interface AppProviderProps {
  children: ReactNode;
};

interface AppContextType {
  appState: AppState | undefined;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const ApplicationContext = createContext<AppContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({
    menuBarHidden: true,
    menuSelectedIndex: 1,
    isMaximised: false
  });

  return (
    <ApplicationContext.Provider value={{ appState, setAppState }}>
      { children }
    </ApplicationContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("No ApplicationProvider found");
  }
  return context;
}
