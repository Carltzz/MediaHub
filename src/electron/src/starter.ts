import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import url from "url";

let mainWindow: BrowserWindow;
const BASE_URL = getBaseUrl();

function getBaseUrl() {
	if (isDev) {
		return "http://localhost:3000/";
	} else {
		return url.format({
			pathname: path.join(__dirname, "/app/build/index.html"),
			protocol: "file"
		});
	}
}

function getUrl(path: string) {
	return `${BASE_URL}#${path}`;
}

export function startMainApp() {
	if (!mainWindow) {
		mainWindow = new BrowserWindow({
			title: "MediaHub",
			width: 1280,
			height: 720,
			autoHideMenuBar: true,
			webPreferences: {
				contextIsolation: true,
				preload: path.join(__dirname, "preload.js")
			},
			resizable: true,
			frame: false
		});

		if (isDev) {
			mainWindow.webContents.openDevTools({
				mode: "detach"
			});
		}

		mainWindow.loadURL(getUrl("/login"));
	} else {
		mainWindow.focus();
	}

	return mainWindow;
}
