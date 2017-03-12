import { takeLatest } from 'redux-saga';
import asyncSaga from './async-sagas';
import { TEST_ASYNC_ACTION } from 'actions/app';
export default function* watchAsync() {
    yield* takeLatest(TEST_ASYNC_ACTION, asyncSaga);
}
