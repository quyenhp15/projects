import { createSlice } from "@reduxjs/toolkit"
import { act } from "react-dom/test-utils"

const initialState = {
    user1: '',
    user2: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user1 = action.payload.user1;
            state.user2 = action.payload.user2;
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice
// Extract and export each action creator by name
export const { setUser } = actions
// Export the reducer, either as a default or named export
export default reducer