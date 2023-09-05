const { ipcMain } = require("electron");
const ytsr = require("ytsr");

const DEFAULT_RESULT_LIMIT = 20;

// Registers all youtube related event handles
function initYoutube() {
	ipcMain.handle("youtube-search", async (event, data) => {
		return await youtubeSearch(data.query);
	});
}

// Executes a YouTube search with the specified query
async function youtubeSearch(query) {
	const results = await ytsr(query, { limit: DEFAULT_RESULT_LIMIT });
	return results;
}

module.exports = {
	initYoutube
};
