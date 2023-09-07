"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    sendMessage: sendMessageToMain,
    invokeMessage: invokeMessageToMain,
    registerListener: registerListenerOnRenderer,
    unregisterListener: unregisterListenerOnRenderer
});
function sendMessageToMain(message, data) {
    electron_1.ipcRenderer.send(message, data);
}
function invokeMessageToMain(message, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return electron_1.ipcRenderer.invoke(message, data);
    });
}
function registerListenerOnRenderer(message, callback) {
    electron_1.ipcRenderer.on(message, callback);
}
function unregisterListenerOnRenderer(message) {
    electron_1.ipcRenderer.removeAllListeners(message);
}
