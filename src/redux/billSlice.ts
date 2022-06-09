import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bill } from '../models/Bill';

export interface BillState {
	currentBill: Bill | null;
	currentCredit: Bill | null
}

const initialState: BillState = {
	currentBill: null,
	currentCredit: null
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
		},
		setCurrentCreditor: (state, action: PayloadAction<Bill>) => {
			state.currentCredit = action.payload
		},
		resetBillSelected: (state) => {
			state.currentBill = null
		}, 
		resetCreditSelected: (state) => {
			state.currentBill = null
		}, 
	},
});

// Action creators are generated for each case reducer function
export const { setCurrentBill, resetBillSelected, setCurrentCreditor, resetCreditSelected } = counterSlice.actions;

export default counterSlice.reducer;
