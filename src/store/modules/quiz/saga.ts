import { takeEvery } from '@redux-saga/core/effects';

import API from '@apis/modules/quiz';
import { createAsyncSaga } from '@store/lib';
import { fetch, fetchRecordQuiz } from './reducer';

const asyncFetchSaga = createAsyncSaga(fetch, API.fetchQuestion);
const asyncFetchRecordQuizSaga = createAsyncSaga(fetchRecordQuiz, API.fetchRecordQuiz);

export default [
  takeEvery(fetch.request, asyncFetchSaga),
  takeEvery(fetchRecordQuiz.request, asyncFetchRecordQuizSaga),
];
