import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuSlice, { MenuState } from "./Menu";
import windowSlice, { WindowState } from "./Window";
import playlistSlice, { PlaylistState } from "./Playlist";

export interface RootStore {
	menu: MenuState;
	window: WindowState;
	playlists: PlaylistState
}

const rootReducer = combineReducers({
	menu: menuSlice.reducer,
	window: windowSlice.reducer,
	playlists: playlistSlice.reducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;
