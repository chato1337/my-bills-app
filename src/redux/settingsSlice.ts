import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
	showForm: boolean
}

const initialState: SettingsState = {
	showForm: false
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setShowForm: (state, action: PayloadAction<boolean>) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.showForm = action.payload;
		}
	},
});

// Action creators are generated for each case reducer function
export const { setShowForm } = settingsSlice.actions;

export default settingsSlice.reducer;
