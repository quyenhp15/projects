import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import messageReducer from '../features/messageSlice';
import bookReducer from '../features/bookSlice'

export default configureStore({
	reducer: {
		user: userReducer,
		message: messageReducer,
		books: bookReducer
	},
});