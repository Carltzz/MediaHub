import { createSlice } from "@reduxjs/toolkit";

export interface WindowState {
	title: string,
	isMaximised: boolean
};

const initialWindowState: WindowState = {
	title: "MediaHub",
	isMaximised: false
};

const windowSlice = createSlice({
	name: 'window',
	initialState: initialWindowState,
	reducers: {
		setMaximised: (state, action) => {
			state.isMaximised = action.payload
		}
	}
});

export const {
	setMaximised
} = windowSlice.actions;

export default windowSlice;
