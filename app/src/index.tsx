import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/Login';
import Titlebar from './components/Titlebar';
import AppContainer from './components/AppContainer';
import MenuBar from './components/MenuBar';
import { ApplicationProvider } from './ApplicationContext';
import Home from './pages/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApplicationProvider>
      <AppContainer>
        <Titlebar />
        <div className="screen">
          <MenuBar />
          <HashRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<LoginScreen />}/>
            </Routes>
          </HashRouter>
        </div>
      </AppContainer>
    </ApplicationProvider>
  </React.StrictMode>
);
