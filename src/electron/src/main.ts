import { app, BrowserWindow, ipcMain } from "electron";

import { initPlaylists } from "./Playlists";
import { initDownloader } from "./Downloader";
import { initYoutube } from "./YouTube";
import { startMainApp } from "./starter";

let currentWindow: BrowserWindow
app.on('ready', () => {
	currentWindow = startMainApp();
	initialiseHandlers();
});

// Initialises all the ipc event handlers
function initialiseHandlers() {
	initPlaylists();
	initDownloader();
	initYoutube();

	ipcMain.on("minimise-window", () => {
		currentWindow.minimize();
	});

	ipcMain.on("maximise-window", (event) => {
		if (currentWindow.isMaximized()) {
			currentWindow.restore();
			event.reply("set-minimise-button", true);
		} else {
			currentWindow.maximize();
			event.reply("set-minimise-button", false);
		}
	});

	ipcMain.on("close-window", () => {
		app.quit();
	});
}
