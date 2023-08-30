const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

var loginWindow;
var mainWindow;
const BASE_URL = getBaseUrl();

function getBaseUrl() {
  if (isDev) {
    return "http://localhost:3000/"
  } else {
    return url.format({
      pathname: path.join(__dirname, '/app/build/index.html'),
      protocol: 'file'
    });
  }
}

function getUrl(path) {
  return `${BASE_URL}#${path}`;
}

function displayLoginWindow() {
  if (!loginWindow) {
    loginWindow = new BrowserWindow({
      title: 'MediaHub - Login',
      width: 1280,
      height: 720,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      resizable: false,
      frame: false
    });

    if (isDev) {
      loginWindow.webContents.openDevTools({
        mode: 'detach'
      });
    }

    loginWindow.loadURL(getUrl("/login"));
  } else {
    loginWindow.focus();
  }
  return loginWindow;
}

function startMainApp(username, isGuest, token = null) {
  if (loginWindow) {
    loginWindow.close();
  }

  if (!mainWindow) {
    mainWindow = new BrowserWindow({
      title: 'MediaHub - ' + username,
      width: 1280,
      height: 720,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      resizable: true,
      frame: false
    });

    if (isDev) {
      mainWindow.webContents.openDevTools({
        mode: 'detach'
      });
    }

    mainWindow.loadURL(getUrl("/"));
  } else {
    mainWindow.focus();
  }

  return mainWindow;
}

module.exports = {
  displayLoginWindow: displayLoginWindow,
  startMainApp: startMainApp,
};
