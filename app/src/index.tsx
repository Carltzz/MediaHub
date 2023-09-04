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
import VideoPlayer from './pages/VideoPlayer';
import Preview from './pages/Preview';
import SearchPage from './pages/SearchPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApplicationProvider>
      <AppContainer>
        <Titlebar />
        <div className="screen">
          <HashRouter>
            <MenuBar />
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/login" element={<LoginScreen />}/>
                <Route path='/preview/:platform/:link'
                       element={<Preview />}/>
                <Route path='/search/:platform?/:query?'
                       element={<SearchPage />}/>
                <Route path="/player/:platform/:id" element={<VideoPlayer />}/>
                <Route path='*' />
            </Routes>
          </HashRouter>
        </div>
      </AppContainer>
    </ApplicationProvider>
  </React.StrictMode>
);
