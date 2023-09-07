import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
	sendMessage: sendMessageToMain,
	invokeMessage: invokeMessageToMain,
	registerListener: registerListenerOnRenderer,
	unregisterListener: unregisterListenerOnRenderer
});

function sendMessageToMain(message: string, data: any) {
	ipcRenderer.send(message, data);
}

async function invokeMessageToMain(message: string, data: any) {
	return ipcRenderer.invoke(message, data);
}

function registerListenerOnRenderer(message: string, callback: any) {
	ipcRenderer.on(message, callback);
}

function unregisterListenerOnRenderer(message: string) {
	ipcRenderer.removeAllListeners(message);
}
