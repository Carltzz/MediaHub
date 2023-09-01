const { app, ipcMain, ipcRenderer, BrowserWindow } = require('electron');
const path = require('path');
const { startMainApp } = require('./starter');
const { initPlaylists } = require('./playlists');
const { downloadYoutube, initDownloader } = require('./api/Downloader');

const validChannels = [
  "get-constants",
  "login-guest"
];

var currentWindow;

app.whenReady().then(() => {
  currentWindow = startMainApp();

  initPlaylists();
  initDownloader();

  ipcMain.handle('get-constants', (event, data) => {
    return validChannels;
  });

  ipcMain.on("minimise-window", (event, data) => {
    currentWindow.minimize();
  });

  ipcMain.on("maximise-window", (event, data) => {
    if (currentWindow.isMaximized()) {
      currentWindow.restore();
      event.reply('set-minimise-button', true);
    } else {
      currentWindow.maximize();
      event.reply('set-minimise-button', false);
    }
  });

   ipcMain.on("close-window", (event, data) => {
     app.quit();
   });
});
