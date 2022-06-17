import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
	name: 'message',
	initialState: {
		messages: [],
	},
	reducers: {
		saveMessage: (state, action) => {
			state.messages = state.messages.concat(action.payload);
		},
	},
});

export const { saveMessage } = messageSlice.actions;
export default messageSlice.reducer;