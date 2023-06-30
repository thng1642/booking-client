import { all } from "redux-saga/effects"
import { watcherFetchRoomsAvailable } from "../features/redux-saga/saga/roomSaga"

export default function* rootSaga() {
    yield all([watcherFetchRoomsAvailable(),])
}