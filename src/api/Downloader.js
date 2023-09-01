const fs = require('fs');
const cp = require('child_process');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { ipcMain } = require('electron');

function downloadYoutube(url) {
  const audio = ytdl(url, {quality: 'lowestaudio'});
  const video = ytdl(url, {quality: 'lowestvideo'});
  const ffmegProcess = cp.spawn(
    ffmpeg, [
      '-i', 'pipe:3',
      '-i', 'pipe:4',
      '-map', '0:a',
      '-map', '1:v',
      '-c:v', 'libx264',
      '-c:a', 'aac',
      'video.mp4'
    ], {
      windowsHide: true,
      stdio: [
        'inherit', 'inherit', 'inherit',
        'pipe', 'pipe'
      ]
    }
  );

  ffmegProcess.on('data', chunk => {
    console.log(chunk.toString().trim());
  });

  audio.pipe(ffmegProcess.stdio[3]);
  video.pipe(ffmegProcess.stdio[4]);
}

function initDownloader() {
  ipcMain.handle('media-download', (event, data) => {
    handleDownload(data.platform, data.url);
  });
}

function handleDownload(platform, url) {
  switch(platform.toLowerCase()) {
    case 'youtube':
      downloadYoutube(url);
      break;
    default:
      console.error("Attempting to download on unknown platform:", platform);
      break;
  }
}

module.exports = {
  downloadYoutube: downloadYoutube,
  initDownloader: initDownloader
};
