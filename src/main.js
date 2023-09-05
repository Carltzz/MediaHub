const { app, ipcMain } = require("electron");

const { startMainApp } = require("./starter");
const { initPlaylists } = require("./playlists");
const { initTokens } = require("./api/Tokens");
const { initDownloader } = require("./api/Downloader");
const { initYoutube } = require("./api/YouTube");

let currentWindow;

app.whenReady().then(() => {
	currentWindow = startMainApp();
	initialiseHandlers();
});

// Initialises all the ipc event handlers
function initialiseHandlers() {
	initPlaylists();
	initDownloader();
	initTokens();
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
