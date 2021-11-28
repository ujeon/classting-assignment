import {
  createAsyncActionEntity,
  createCustomReducer,
  createAsyncAction,
  createAction,
  createActionEntity,
} from '@store/lib';
import _map from 'lodash/map';
import { FetchResponse, FetchRequest, FetchError } from '@apis/modules/quiz';
import { formatQuestions } from '@utils/quiz';

export interface Answer {
  option: string;
  isSelected: boolean;
}

export type QuestionType = 'multiple' | 'boolean';

export interface Question {
  category: string;
  type: QuestionType;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: Answer[];
  isCorrect?: boolean | null;
}

interface SelectedAnswer {
  questionIndex: number;
  selectedOption: string;
}

interface QuestionIndex {
  index: number;
}

const FETCH = createAsyncAction('quiz/FETCH');
const UPDATE_SELECTED_ANSWER = createAction('quiz/UPDATE_SELECTED_ANSWER');
const UPDATE_CURRENT_QUESTION_INDEX = createAction('quiz/UPDATE_CURRENT_QUESTION_INDEX');

export const fetch = createAsyncActionEntity<FetchRequest, FetchResponse, FetchError>(FETCH);
export const updateSelectedAnswer = createActionEntity<SelectedAnswer>(UPDATE_SELECTED_ANSWER);
export const updateCurrQuestionIndex = createActionEntity<QuestionIndex>(
  UPDATE_CURRENT_QUESTION_INDEX,
);

const actions = { fetch, updateSelectedAnswer, updateCurrQuestionIndex };
const state = {
  questions: [] as Question[],
  message: '',
  currQuestionIndex: 0,
};

const reducer = createCustomReducer(state, actions)
  .handleAction(fetch.success, (state, action) => {
    return { ...state, questions: formatQuestions(action.payload.results) };
  })
  .handleAction(fetch.failure, (state, action) => {
    return { ...state, message: action.payload.message };
  })
  .handleAction(updateSelectedAnswer, (state, action) => {
    const { questions } = { ...state };
    const { questionIndex, selectedOption } = action.payload;
    const { answers } = questions[questionIndex];
    const updatedAnswers = _map(answers, (answer) => {
      const updatedAnswer = { ...answer };
      updatedAnswer.isSelected = updatedAnswer.option === selectedOption;
      return updatedAnswer;
    });
    questions[questionIndex].answers = updatedAnswers;
    questions[questionIndex].isCorrect = questions[questionIndex].correct_answer === selectedOption;
    return { ...state, questions };
  })
  .handleAction(updateCurrQuestionIndex, (state, action) => {
    return { ...state, currQuestionIndex: action.payload.index };
  })
  .handleAction(fetch.request, (state, action) => {
    return { ...state, questions: [], currQuestionIndex: 0, message: '' };
  });
export default reducer;
