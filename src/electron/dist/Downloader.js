"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDownloader = void 0;
const electron_1 = require("electron");
// Downloads a video from the specified YouTube URL
// Only supports lowest audio at the moment until I
// figure out how to process files faster
function downloadYoutube(url) {
    // if (!ffmpeg) {
    // 	console.error("ffmpeg is not correctly configured.");
    // 	return;
    // }
    // const audio = ytdl(url, {quality: "lowestaudio"});
    // const video = ytdl(url, {quality: "lowestvideo"});
    // const ffmegProcess = cp.spawn(
    // 	ffmpeg, [
    // 		"-i", "pipe:3",
    // 		"-i", "pipe:4",
    // 		"-map", "0:a",
    // 		"-map", "1:v",
    // 		"-c:v", "libx264",
    // 		"-c:a", "aac",
    // 		"video.mp4"
    // 	], {
    // 		windowsHide: true,
    // 		stdio: [
    // 			"inherit", "inherit", "inherit",
    // 			"pipe", "pipe"
    // 		]
    // 	}
    // );
    // ffmegProcess.on("data", chunk => {
    // 	console.log(chunk.toString().trim());
    // });
    // audio.pipe(ffmegProcess.stdio[3]);
    // video.pipe(ffmegProcess.stdio[4]);
}
// Initialises all the event handles for the downloader
function initDownloader() {
    electron_1.ipcMain.handle("media-download", (event, data) => {
        handleDownload(data.platform, data.url);
    });
}
exports.initDownloader = initDownloader;
// Downloads media from the specified platform
function handleDownload(platform, url) {
    switch (platform.toLowerCase()) {
        case "youtube":
            downloadYoutube(url);
            break;
        default:
            console.error("Attempting to download on unknown platform:", platform);
            break;
    }
}
