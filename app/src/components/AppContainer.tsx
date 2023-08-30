import { ReactNode } from "react";
import './AppContainer.scss'

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({children}) => {
  return (
    <div className="app-container">
      {children}
    </div>
  );
};

export default AppContainer;
