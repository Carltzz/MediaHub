import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuSlice, { MenuState } from "./Menu";
import windowSlice, { WindowState } from "./Window";

export interface RootStore {
	menu: MenuState;
	window: WindowState;
}

const rootReducer = combineReducers({
	menu: menuSlice.reducer,
	window: windowSlice.reducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;
