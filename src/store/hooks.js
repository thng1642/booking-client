import { useContext } from "react"
import { DispatchContext, ValueContext } from "./Context"

/**
 * Custom hook to gets root state (global state)
 */
export const useMyRootState = () => {
    const state = useContext(ValueContext)

    return state 
}

/**
 * Custom hook to gets dispatch function
 */
export const useMyDispatch = () => {
    const dispatch = useContext(DispatchContext)

    return dispatch
}