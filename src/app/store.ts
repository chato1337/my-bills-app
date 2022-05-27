import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice";
import billSlice from "../redux/billSlice";
import settingsSlice from "../redux/settingsSlice";

export const store = configureStore({
	reducer: {
        bill: billSlice,
        settings: settingsSlice,
        auth: authSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
