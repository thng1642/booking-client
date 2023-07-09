import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import roomAvailableReducers from '../features/redux-saga/room/roomAvailableSlice'
import rootSaga from './rootSaga'
import validInfoFormReducers from '../features/redux-saga/valid-form/validInFoFormSlice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        roomAvailable: roomAvailableReducers,
        validInfoForm: validInfoFormReducers,
    },  
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store