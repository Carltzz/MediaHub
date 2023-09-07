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
exports.initYoutube = void 0;
const { ipcMain } = require("electron");
const ytsr = require("ytsr");
const DEFAULT_RESULT_LIMIT = 20;
// Registers all youtube related event handles
function initYoutube() {
    ipcMain.handle("youtube-search", (event, data) => __awaiter(this, void 0, void 0, function* () {
        return yield youtubeSearch(data.query);
    }));
}
exports.initYoutube = initYoutube;
// Executes a YouTube search with the specified query
function youtubeSearch(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield ytsr(query, { limit: DEFAULT_RESULT_LIMIT });
        return results;
    });
}
