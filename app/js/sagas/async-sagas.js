import { put, call } from 'redux-saga/effects';
import api from 'api';
import {
    TEST_ASYNC_ACTION_START,
    TEST_ASYNC_ACTION_ERROR,
    TEST_ASYNC_ACTION_SUCCESS,
} from 'actions/app';

export default function *asyncSaga() {
    const data = yield call(api.testAsync);

    if (data) {
        yield put(testAsyncSuccess(data));
    }
    else {
        yield put(testAsyncError(data));
    }
}

function testAsyncSuccess(data) {
    return {
        type: TEST_ASYNC_ACTION_SUCCESS,
        data,
    };
}

function testAsyncError(error) {
    return {
        type: TEST_ASYNC_ACTION_ERROR,
        error,
    };
}