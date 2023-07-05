import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const roomAvailableSlice = createSlice({
    name: 'room-available',
    initialState,
    reducers: {
        fetchRoomsAvailable(state, action){

        },
        successFetching(state, action){
            // console.log(action.payload)
            return action.payload
            // return {
            //     [...action.payload]
            // }
        }
    }
})

// Reduces
const roomAvailableReducers = roomAvailableSlice.reducer
// Actions
const roomAvailableActions = roomAvailableSlice.actions

export { roomAvailableActions }
export default roomAvailableReducers