const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendMessage: (message, data={}) => {
    ipcRenderer.send(message, data);
  },
  invokeMessage: async (message, data = {}) => {
    const response = await ipcRenderer.invoke(message, data);
    return response;
  }
});
