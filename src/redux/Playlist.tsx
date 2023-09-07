import { createSlice } from "@reduxjs/toolkit";
import { MediaPlaylist } from "../media/MediaPlaylist";

export interface PlaylistState {
	playlists: MediaPlaylist[]
}

const initialPlaylistState: PlaylistState = {
	playlists: []
};

const playlistAdd = (state: PlaylistState, playlist: MediaPlaylist) => {
	if (state.playlists.find(item => item.id == playlist.id)) {
		console.error("Playlist with the same id already exists.");
		return;
	}

	state.playlists.push(playlist);
}

const playlistRemove = (state: PlaylistState, playlist: MediaPlaylist) => {
	state.playlists = state.playlists.filter(
		item => item.id != playlist.id
	);
}

const playlistSlice = createSlice({
	name: 'playlist',
	initialState: initialPlaylistState,
	reducers: {
		addPlaylist: (state, action) =>
			playlistAdd(state, action.payload),

		removePlaylist: (state, action) =>
			playlistRemove(state, action.payload)
	}
});

export const {
	addPlaylist,
	removePlaylist
} = playlistSlice.actions;

export default playlistSlice;
