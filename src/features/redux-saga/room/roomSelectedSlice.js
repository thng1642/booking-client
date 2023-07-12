import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    totalPrice: 0.0
}

const roomSelectedSlice = createSlice({
    name: "room-selected",
    initialState,
    reducers: {
        addRoom(state, action) {
            // console.log("Room Selected: ", action.payload)
            state.rooms.push(action.payload)
            state.totalPrice += action.payload.price
            return state
        },
        removeRoom(state, action) {

            state.rooms = state.rooms.filter( item => item.roomNumber !== action.payload.roomNumber)
            state.totalPrice -= action.payload.price
            console.log("Rooms Selected: ", state)
            return state
        }
    }
})
// Reducers
const roomSelectedReducers = roomSelectedSlice.reducer
export default roomSelectedReducers
//Actions
const roomSelectedActions = roomSelectedSlice.actions
export { roomSelectedActions }