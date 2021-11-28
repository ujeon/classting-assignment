import { takeEvery } from '@redux-saga/core/effects';

import API from '@apis/modules/quiz';
import { createAsyncSaga } from '@store/lib';
import { fetch } from './reducer';

const asyncFetchSaga = createAsyncSaga(fetch, API.fetchQuestion);

export default [takeEvery(fetch.request, asyncFetchSaga)];
