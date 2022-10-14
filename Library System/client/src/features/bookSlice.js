import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBooks = async () => {
    return await axios.get('http://localhost:5000/books')
}

export const bookSlice = createSlice({
    name: 'books',
    initialState: {
        bookList: [],
    },
    reducers: {
        setBookList: (state, action) => {
            // state.bookList = [...state.bookList, action.payload];
            // state.bookList = [...state.bookList, ...action.payload];
            state.bookList = action.payload;

        },
        addToBookList: (state, action) => {
            state.bookList = [...state.bookList, action.payload];
        },
        updateAvailable: (state, action) => {

            for (let updatedBook of action.payload) {
                const bookIndex = state.bookList.findIndex(book => book._id === updatedBook._id)
                state.bookList[bookIndex].available = updatedBook.available
            }

        },

    },
});

export const { setBookList, addToBookList, updateAvailable } = bookSlice.actions;
// export const selectUser = (state) => state.user.user;
export default bookSlice.reducer;
