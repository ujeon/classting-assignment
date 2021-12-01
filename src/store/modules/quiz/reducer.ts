import {
  createAsyncActionEntity,
  createCustomReducer,
  createAsyncAction,
  createAction,
  createActionEntity,
} from '@store/lib';
import _map from 'lodash/map';
import _countBy from 'lodash/countBy';
import {
  FetchResponse,
  FetchRequest,
  FetchError,
  FetchRecordQuizRequest,
  FetchRecordQuizResponse,
  FetchRecordQuizError,
  FetchGetRecordQuizRequest,
  FetchGetRecordQuizResponse,
  FetchGetRecordQuizError,
} from '@apis/modules/quiz';
import { formatQuestions } from '@utils/quiz';
import { convertMilliToHhMmSs } from '@utils/common';

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

export interface HhMmSs {
  hh: string;
  mm: string;
  ss: string;
}

export interface QuizRecord {
  correct_answer: string;
  question: string;
  selected_answer: string;
  userId: string;
  category: string;
}

const FETCH = createAsyncAction('quiz/FETCH');
const FETCH_RECORD_QUIZ = createAsyncAction('quiz/FETCH_RECORD_QUIZ');
const FETCH_GET_RECORD_QUIZ = createAsyncAction('quiz/FETCH_GET_RECORD_QUIZ');

const UPDATE_SELECTED_ANSWER = createAction('quiz/UPDATE_SELECTED_ANSWER');
const UPDATE_CURRENT_QUESTION_INDEX = createAction('quiz/UPDATE_CURRENT_QUESTION_INDEX');
const SET_END_TIME = createAction('quiz/SET_END_TIME');
const COUNT_CORRECT_INCORRECT_ANSWERS = createAction('COUNT_CORRECT_INCORRECT_ANSWERS');
const RETRY_QUIZ = createAction('RETRY_QUIZ');
const TOGGLE_QUIZ_MODAL = createAction('TOGGLE_QUIZ_MODAL');
const UPDATE_QUIZ_COMPLETE = createAction('UPDATE_QUIZ_COMPLETE');

export const fetch = createAsyncActionEntity<FetchRequest, FetchResponse, FetchError>(FETCH);
export const fetchRecordQuiz = createAsyncActionEntity<
  FetchRecordQuizRequest,
  FetchRecordQuizResponse,
  FetchRecordQuizError
>(FETCH_RECORD_QUIZ);
export const fetchGetRecordQuiz = createAsyncActionEntity<
  FetchGetRecordQuizRequest,
  FetchGetRecordQuizResponse,
  FetchGetRecordQuizError
>(FETCH_GET_RECORD_QUIZ);

export const updateSelectedAnswer = createActionEntity<SelectedAnswer>(UPDATE_SELECTED_ANSWER);
export const updateCurrQuestionIndex = createActionEntity<QuestionIndex>(
  UPDATE_CURRENT_QUESTION_INDEX,
);
export const setEndTime = createActionEntity<number>(SET_END_TIME);
export const countCorrectInCorrectAnswers = createActionEntity<null>(
  COUNT_CORRECT_INCORRECT_ANSWERS,
);
export const retryQuiz = createActionEntity<never>(RETRY_QUIZ);
export const toggleQuizModal = createActionEntity<boolean>(TOGGLE_QUIZ_MODAL);
export const updateQuizComplete = createActionEntity<boolean>(UPDATE_QUIZ_COMPLETE);

const actions = {
  fetch,
  fetchRecordQuiz,
  fetchGetRecordQuiz,
  updateSelectedAnswer,
  updateCurrQuestionIndex,
  setEndTime,
  countCorrectInCorrectAnswers,
  retryQuiz,
  toggleQuizModal,
  updateQuizComplete,
};

interface QuizState {
  questions: Question[];
  message: string;
  currQuestionIndex: number;
  startTime: number;
  endTime: number;
  elapsedTime: HhMmSs;
  correctAnswerCount: number;
  inCorrectAnswerCount: number;
  quizModalVisible: boolean;
  quizRecord: QuizRecord[];
  isComplete: boolean;
}

const state: QuizState = {
  questions: [] as Question[],
  message: '',
  currQuestionIndex: 0,
  startTime: 0,
  endTime: 0,
  elapsedTime: { hh: '', mm: '', ss: '' },
  correctAnswerCount: 0,
  inCorrectAnswerCount: 0,
  quizModalVisible: false,
  quizRecord: [] as QuizRecord[],
  isComplete: false,
};

const reducer = createCustomReducer(state, actions)
  .handleAction(fetch.success, (state, action) => {
    return {
      ...state,
      questions: formatQuestions(action.payload.results),
      startTime: new Date().getTime(),
    };
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
  .handleAction(setEndTime, (state, action) => {
    const endTime = action.payload;
    const { startTime } = { ...state };
    const elapsedTime = convertMilliToHhMmSs(endTime - startTime);
    return { ...state, endTime, elapsedTime };
  })
  .handleAction(countCorrectInCorrectAnswers, (state, action) => {
    const { true: correctAnswerCount = 0, false: inCorrectAnswerCount = 0 } = _countBy(
      [...state.questions],
      (question) => question.isCorrect,
    );
    return { ...state, correctAnswerCount, inCorrectAnswerCount };
  })
  .handleAction(fetch.request, (state, action) => {
    return {
      ...state,
      questions: [],
      currQuestionIndex: 0,
      message: '',
      startTime: 0,
      endTime: 0,
      elapsedTime: { hh: '', mm: '', ss: '' },
      correctAnswerCount: 0,
      inCorrectAnswerCount: 0,
    };
  })
  .handleAction(toggleQuizModal, (state, action) => {
    return {
      ...state,
      quizModalVisible: action.payload,
    };
  })
  .handleAction(fetchGetRecordQuiz.success, (state, action) => {
    return { ...state, quizRecord: action.payload.results };
  })
  .handleAction(updateQuizComplete, (state, action) => {
    return { ...state, isComplete: action.payload };
  })
  .handleAction(retryQuiz, (state, action) => {
    let { questions } = { ...state };
    questions = _map(questions, ({ answers, ...properties }) => {
      return {
        ...properties,
        isCorrect: false,
        answers: _map(answers, ({ option }) => {
          return { option, isSelected: false };
        }),
      };
    });
    return {
      ...state,
      questions,
      currQuestionIndex: 0,
      startTime: new Date().getTime(),
      elapsedTime: { hh: '', mm: '', ss: '' },
      correctAnswerCount: 0,
      inCorrectAnswerCount: 0,
    };
  });

export default reducer;
