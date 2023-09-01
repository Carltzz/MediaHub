import { faWindowMaximize, faWindowMinimize, faWindowRestore, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Titlebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useAppContext } from '../ApplicationContext';

const Titlebar = () => {
  const { appState, setAppState } = useAppContext();

  useEffect(() => {
    const ipc = (window as any).api;

    ipc.registerListener('set-minimise-button', (event: any, data: boolean) => {
      setAppState(prevState => ({
        ...prevState,
        isMaximised: !data
      }));
    });

    return () => {
      ipc.unregisterListener('set-minimise-button');
    }
  }, [setAppState]);

  const minimiseWindow = () => {
    (window as any).api.sendMessage("minimise-window");
  }

  const maximiseWindow = () => {
    (window as any).api.sendMessage("maximise-window");
  }

  const closeWindow = () => {
    (window as any).api.sendMessage("close-window");
  }

  return (
    <div className='titlebar'>
      <div className='title'>MediaHub - YouTube</div>
      <div className='windowControls'>
        <FontAwesomeIcon
          icon={faWindowMinimize}
          className='minimise'
          onClick={minimiseWindow} />
        <FontAwesomeIcon
          icon={appState?.isMaximised ? faWindowRestore : faWindowMaximize}
          className='maximise'
          onClick={maximiseWindow}/>
        <FontAwesomeIcon
          icon={faXmark}
          className='close'
          onClick={closeWindow}/>
      </div>
    </div>
  );
};

export default Titlebar;
