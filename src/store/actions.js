import { LOGIN_SUCCESS, LOGIN_USER, LOGOUT_USER } from './constants'

export const loginUser = payload => ({
    type: LOGIN_USER,
    payload
})

export const loginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
})

export const logoutUser = payload => ({
    type: LOGOUT_USER
})