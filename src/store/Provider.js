import { useEffect, useReducer } from "react";

import reducer , { initialState } from "./reducer";
import { DispatchContext, ValueContext } from "./Context";

export default function Provider( {children} ) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <ValueContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </ValueContext.Provider>
    )
}