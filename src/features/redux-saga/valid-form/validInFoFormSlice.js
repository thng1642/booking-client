import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isName: false,
    isEmail: false,
    isPhoneNumber: false,
    isCardNumber: false
}

const validInfoFormSlice = createSlice({
    name: 'valid-info-form',
    initialState,
    reducers: {
        inputNameSuccess(state){
            return {
                ...state,
                isName: true
            }
        },
        inputEmailSuccess(state) {
            return {
                ...state,
                isEmail: true
            }
        },
        inputPhoneNumberSuccess(state) {
            return {
                ...state,
                isPhoneNumber: true
            }
        },
        inputCardNumberSuccess(state) {
            return {
                ...state,
                isCardNumber: true
            }
        },
        inputNameFail(state){
            return {
                ...state,
                isName: false
            }
        },
        inputEmailFail(state) {
            return {
                ...state,
                isEmail: false
            }
        },
        inputPhoneNumberFail(state) {
            return {
                ...state,
                isPhoneNumber: false
            }
        },
        inputCardNumberFail(state) {
            return {
                ...state,
                isCardNumber: false
            }
        }
    }
})

const validInfoFormActions = validInfoFormSlice.actions
export { validInfoFormActions }

const validInfoFormReducers = validInfoFormSlice.reducer
export default validInfoFormReducers