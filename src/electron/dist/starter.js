"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMainApp = void 0;
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
let mainWindow;
const BASE_URL = getBaseUrl();
function getBaseUrl() {
    if (electron_is_dev_1.default) {
        return "http://localhost:3000/";
    }
    else {
        return url_1.default.format({
            pathname: path_1.default.join(__dirname, "/app/build/index.html"),
            protocol: "file"
        });
    }
}
function getUrl(path) {
    return `${BASE_URL}#${path}`;
}
function startMainApp() {
    if (!mainWindow) {
        mainWindow = new electron_1.BrowserWindow({
            title: "MediaHub",
            width: 1280,
            height: 720,
            autoHideMenuBar: true,
            webPreferences: {
                contextIsolation: true,
                preload: path_1.default.join(__dirname, "preload.js")
            },
            resizable: true,
            frame: false
        });
        if (electron_is_dev_1.default) {
            mainWindow.webContents.openDevTools({
                mode: "detach"
            });
        }
        mainWindow.loadURL(getUrl("/login"));
    }
    else {
        mainWindow.focus();
    }
    return mainWindow;
}
exports.startMainApp = startMainApp;
