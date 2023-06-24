import { LOGIN_SUCCESS } from "./constants"

const initialState = {
    login: {},
    isAuth: false
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

        default: 
            // console.log("hello")
            return new Error('Loi')
        
    }
}
export { initialState }
export default reducer