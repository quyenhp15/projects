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
		deleteMessage: (state) => {
			state.messages = []
		},
	},
});

export const { saveMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;