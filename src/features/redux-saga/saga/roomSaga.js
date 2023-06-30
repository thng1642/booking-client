import { call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { roomAvailableActions } from "../room/roomAvailableSlice";
import axios from "axios";

function fetching(data) {
    return axios({
        url: 'http://localhost:5000/api/v1/room/available',
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    })
        .then(res => [ res.data, null ])
        .catch(err => [ null, err.response.data])
}

function* handleFetchRoomsAvail(action) {
    // console.log(action.payload);
    const data = JSON.stringify(action.payload)
    // yield delay(2000)
    const [ result, error ] = yield call(fetching, data)
    if ( result ) {
        yield put(roomAvailableActions.successFetching(result))
    }
}

function* workerFetchRoomsAvail() {
    yield takeLatest(roomAvailableActions.fetchRoomsAvailable, handleFetchRoomsAvail)
    
}

export function* watcherFetchRoomsAvailable(){
    yield fork(workerFetchRoomsAvail)
}