"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPlaylists = exports.savePlaylists = exports.loadPlaylists = void 0;
const electron_1 = require("electron");
const electron_2 = require("electron");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const userDataPath = electron_1.app.getPath("userData");
const playlists = [];
// Creates the default config files
const createSkeleton = (user) => {
    const userHome = path_1.default.join(userDataPath, user);
    try {
        fs_1.default.mkdirSync(userHome, { recursive: true });
        createIfNotExists(userHome, "playlists.json");
    }
    catch (error) {
        console.error("Failed to create skeleton files:", error);
    }
};
// Creates the file if it doesn't exist and initialises it to an empty array
const createIfNotExists = (userHome, file) => {
    const filePath = path_1.default.join(userHome, file);
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.writeFileSync(filePath, "[]");
    }
};
// Extracts compatible fields from the json object into a track
const parseTracks = (items) => {
    const tracks = [];
    for (const item of items) {
        try {
            const track = {
                name: item.name,
                author: item.author,
                thumbnail: item.thumbnail,
                link: item.link
            };
            if (track.link) {
                tracks.push(track);
            }
        }
        catch (error) {
            console.error("Error loading track:", error);
        }
    }
    return tracks;
};
// Loads the playlists for the specified user
const loadPlaylists = (user) => {
    createSkeleton(user);
    const playlistsFilePath = path_1.default.join(userDataPath, user, "playlists.json");
    const playlists = [];
    try {
        const fileData = fs_1.default.readFileSync(playlistsFilePath, "utf8");
        console.log("Loaded file:", fileData);
        const json = JSON.parse(fileData);
        for (const arrayItem of json) {
            try {
                const parsedPlaylist = {
                    name: arrayItem.name,
                    author: arrayItem.author,
                    tracks: parseTracks(arrayItem.tracks)
                };
                if (parsedPlaylist.name && parsedPlaylist.tracks) {
                    playlists.push(parsedPlaylist);
                }
            }
            catch (error) {
                console.error("Error loading playlist:", error);
            }
        }
    }
    catch (error) {
        console.error("Error loading playlists:", error);
    }
    return playlists;
};
exports.loadPlaylists = loadPlaylists;
// Saves the playlists for the specified user
const savePlaylists = (user, playlists) => {
    const savePath = path_1.default.join(userDataPath, user, "playlists.json");
    try {
        const playlistData = JSON.stringify(playlists, null, 2);
        fs_1.default.writeFileSync(savePath, playlistData, "utf8");
    }
    catch (error) {
        console.error("Error saving playlists:", error);
    }
};
exports.savePlaylists = savePlaylists;
const initPlaylists = () => {
    electron_2.ipcMain.handle("load-playlists", (event, data) => {
        return (0, exports.loadPlaylists)(data);
    });
    electron_2.ipcMain.handle("add-playlist", (event, data) => {
        try {
            if (data) {
                playlists.push(data);
            }
        }
        catch (error) {
            console.error("Error adding playlist:", error);
        }
    });
};
exports.initPlaylists = initPlaylists;
