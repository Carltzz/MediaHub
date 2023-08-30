const { app, ipcMain, ipcRenderer, BrowserWindow } = require('electron');
const path = require('path');
const { displayLoginWindow, startMainApp } = require('./starter');

const validChannels = [
  "get-constants",
  "login-guest"
];

var currentWindow;

app.whenReady().then(() => {
   currentWindow = displayLoginWindow();

   ipcMain.handle('get-constants', (event, data) => {
     return validChannels;
   });

   ipcMain.handle('login-guest', (event, data) => {
     currentWindow = startMainApp("Guest", true);
   });

   ipcMain.on("minimise-window", (event, data) => {
     currentWindow.minimize();
   });

   ipcMain.on("maximise-window", (event, data) => {
     if (currentWindow.isMaximized()) {
       currentWindow.restore();
       event.reply('set-minimize-button', true);
     } else {
       currentWindow.maximize();
       event.reply('set-minimize-button', false);
     }
   });

   ipcMain.on("close-window", (event, data) => {
     app.quit();
   });
});
