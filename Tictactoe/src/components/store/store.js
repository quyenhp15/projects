import { configureStore } from '@reduxjs/toolkit'
import positionSlice from './positionSlice.js'
import userSlice from './userSlice.js'

const store = configureStore({
    reducer: { position: positionSlice, user: userSlice }
})

export default store