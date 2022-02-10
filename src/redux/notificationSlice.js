import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		isError: false,
		msg: "Everything is Allright",
		dis: "none",
		color: "#4BB543",
	},
	reducers: {
		setNotiError: (state, actions) => {
			state.msg = actions.payload.msg;
			state.isError = true;
			state.dis = "flex";
			state.color = "#B00020";
		},

		closeNoti: (state, actions) => {
			state.isError = false;
			state.msg = "Everything is Allright!";
			state.dis = "none";
		},

		setNotiSuccess: (state, actions) => {
			state.msg = actions.payload.msg;
			state.dis = "flex";
			state.isError = false;
			state.color = "#4BB543";
		},
	},
});

export default notificationSlice.reducer;
export const { setNotiError, setNotiSuccess, closeNoti } =
	notificationSlice.actions;
