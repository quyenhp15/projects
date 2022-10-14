import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    X: [],
    O: []
}

const positionSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addXPosition(state, action) {
            state.X = [...state.X, action.payload]
        },
        addOPosition(state, action) {
            state.O = [...state.O, action.payload]
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = positionSlice
// Extract and export each action creator by name
export const { addXPosition, addOPosition } = actions
// Export the reducer, either as a default or named export
export default reducer