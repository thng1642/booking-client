import { FETCH_ROOM_AVAILABLE, LOGIN_SUCCESS } from "./constants"

const initialState = {
    login: {},
    isAuth: false,
    roomAvailable: []
}

function reducer( state, action ) {
    // console.log("Reducer running")
    switch ( action.type ) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: action.payload,
                isAuth: true
            }
        case FETCH_ROOM_AVAILABLE:
            
            return {
                ...state
            }
        default: 
            // console.log("hello")
            return new Error('Loi')
        
    }
}
export { initialState }
export default reducer