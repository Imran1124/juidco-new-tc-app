import { useContext, createContext } from 'react';
import TitleContext from './titleContext';
import AuthContext from './AuthContext';
import DrawerContext from './drawerContext';

const AppContext = createContext();

export const useAppContext = () => {
  // with error handling
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};

export default function ContextProviders({ children }) {
  const titleValue = TitleContext();
  const authValue = AuthContext();
  const drawerValue = DrawerContext();
  const contextValue = Object.assign({}, titleValue, authValue, drawerValue);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
