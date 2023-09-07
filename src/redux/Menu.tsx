import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
	hidden: boolean,
	selectedIndex: number,
}

const initialMenuState: MenuState = {
	hidden: true,
	selectedIndex: 0
}

const menuSlice = createSlice({
	name: 'menu',
	initialState: initialMenuState,
	reducers: {
		setMenuSelectedIndex: (state, action) => {
			state.selectedIndex = action.payload;
		},
		setMenuHidden: (state, action) => {
			console.log("Menu bar state changed")
			state.hidden = action.payload;
		}
	}
});

export const {
	setMenuHidden,
	setMenuSelectedIndex,
} = menuSlice.actions;

export default menuSlice;
