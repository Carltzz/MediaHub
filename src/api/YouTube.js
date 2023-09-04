const { ipcMain } = require('electron');
const ytsr = require('ytsr');

function initYoutube() {
  ipcMain.handle('youtube-search', async (event, data) => {
    return await youtubeSearch(data.query);
  });
}

async function youtubeSearch(query) {
  const results = await ytsr(query, { limit: 20 });
  return results;
}

module.exports = {
  initYoutube
}
