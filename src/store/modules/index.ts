import { combineReducers } from 'redux';
import { combineSagas } from '@store/lib';

import quiz from './quiz';

export default {
  rootReducer: combineReducers({ quiz: quiz.reducer }),
  rootSagas: combineSagas({ quiz: quiz.saga }),
};
