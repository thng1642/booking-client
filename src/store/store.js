import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import roomAvailableReducers from '../features/redux-saga/room/roomAvailableSlice'
import rootSaga from './rootSaga'
import validInfoFormReducers from '../features/redux-saga/valid-form/validInFoFormSlice'
import roomSelectedReducers from '../features/redux-saga/room/roomSelectedSlice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        roomAvailable: roomAvailableReducers,
        validInfoForm: validInfoFormReducers,
        roomSelected: roomSelectedReducers,
    },  
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store