import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		id: null,
		token: null,
		userName: null,
		isLoggedIn: false,
	},
	reducers: {
		updateUser: (state, actions) => {
			state.id = actions.payload._id;
			state.token = actions.payload.token;
			state.isLoggedIn = true;
			state.userName = actions.payload.username;
		},
		logoutUser: (state, actions) => {
			state.id = null;
			state.isLoggedIn = false;
			state.userName = null;
			state.token = null;
		},
	},
});

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
