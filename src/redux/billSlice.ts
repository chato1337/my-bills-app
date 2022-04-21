import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bill } from '../models/Bill';

export interface BillState {
	currentBill: Bill | {};
}

const initialState: BillState = {
	currentBill: {},
};

export const counterSlice = createSlice({
	name: "bill",
	initialState,
	reducers: {
		setCurrentBill: (state, action: PayloadAction<Bill>) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.currentBill = action.payload;
		}
	},
});

// Action creators are generated for each case reducer function
export const { setCurrentBill } = counterSlice.actions;

export default counterSlice.reducer;
