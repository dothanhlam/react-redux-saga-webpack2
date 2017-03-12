import { fork } from 'redux-saga/effects';
import watchAsync from './watchers';

export default function* rootSaga() {
    yield fork(watchAsync);
}
