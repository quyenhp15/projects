import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import messageReducer from '../features/messageSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		message: messageReducer,
	},
});