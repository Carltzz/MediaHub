const { app, ipcMain } = require('electron');
const { TOKENS } = require('../MediaHub');
const path = require('path');
const fs = require('fs');

function loadTokens() {
  if (!fs.existsSync('tokens.json')) {
    return [];
  }
  const tokensPath = 'tokens.json';
  const fileData = fs.readFileSync(tokensPath, 'utf8');
  return JSON.parse(fileData);
}

function saveTokens(tokens) {
  const savePath = 'tokens.json';
  try {
    const fileData = JSON.stringify(tokens, null, 2);
    fs.writeFileSync(savePath, fileData, 'utf8');
  } catch(error) {
    console.error('Failed saving tokens:', error);
  }
}

function initTokens() {
  ipcMain.handle('get-token', (event, data) => {
    let token = undefined;
    try {
      token = TOKENS[data];
    } catch(error) {
      console.error("Unknown token:", data);
    } finally {
      return token;
    }
  });

  const loadedTokens = loadTokens();
  TOKENS.youtube = loadedTokens.youtube;
  TOKENS.soundcloud = loadedTokens.soundcloud;
  console.log(TOKENS);
}

module.exports = {
  loadTokens,
  saveTokens,
  initTokens
}
