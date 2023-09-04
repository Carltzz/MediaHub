const { app, ipcMain, ipcRenderer, BrowserWindow } = require('electron');
const path = require('path');
const { startMainApp } = require('./starter');
const { initPlaylists } = require('./playlists');
const { initTokens } = require('./api/Tokens');
const { initDownloader } = require('./api/Downloader');
const { initYoutube } = require('./api/YouTube')

let currentWindow;
let tokens;

app.whenReady().then(() => {
  currentWindow = startMainApp();

  initPlaylists();
  initDownloader();
  initTokens();
  initYoutube();

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
