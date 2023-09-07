"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Playlists_1 = require("./Playlists");
const Downloader_1 = require("./Downloader");
const YouTube_1 = require("./YouTube");
const starter_1 = require("./starter");
let currentWindow;
electron_1.app.on('ready', () => {
    currentWindow = (0, starter_1.startMainApp)();
    initialiseHandlers();
});
// Initialises all the ipc event handlers
function initialiseHandlers() {
    (0, Playlists_1.initPlaylists)();
    (0, Downloader_1.initDownloader)();
    (0, YouTube_1.initYoutube)();
    electron_1.ipcMain.on("minimise-window", () => {
        currentWindow.minimize();
    });
    electron_1.ipcMain.on("maximise-window", (event) => {
        if (currentWindow.isMaximized()) {
            currentWindow.restore();
            event.reply("set-minimise-button", true);
        }
        else {
            currentWindow.maximize();
            event.reply("set-minimise-button", false);
        }
    });
    electron_1.ipcMain.on("close-window", () => {
        electron_1.app.quit();
    });
}
