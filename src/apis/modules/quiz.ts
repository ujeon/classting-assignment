import firestore from '@react-native-firebase/firestore';
import { Question } from '@store/modules/quiz/reducer';
import uuid from 'react-native-uuid';
import _forEach from 'lodash/forEach';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createWrongAnswersRecord } from '@utils/quiz';

export interface FetchRequest {}

export interface FetchResponse {
  status: string;
  response_code: number;
  results: Question[];
}

export interface FetchError {
  message: string;
}

export interface FetchRecordQuizRequest {
  questions: Question[];
}

export interface FetchRecordQuizResponse {}

export interface FetchRecordQuizError {}

const fetchQuestion = (): Promise<FetchResponse> => {
  return fetch('https://opentdb.com/api.php?amount=10').then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<FetchResponse>;
  });
};

const fetchRecordQuiz = async (payload: FetchRecordQuizRequest): Promise<void> => {
  try {
    const prevUserUniqueId = await AsyncStorage.getItem('@userUniqueId');
    let userUniqueId: string;
    if (!prevUserUniqueId) {
      userUniqueId = uuid.v4() as string;
      await AsyncStorage.setItem('@userUniqueId', userUniqueId);
    } else {
      userUniqueId = prevUserUniqueId;
    }
    const wrongAnswerRecord = createWrongAnswersRecord(payload.questions);
    _forEach(wrongAnswerRecord, ({ question, correct_answer, selected_answer }) => {
      firestore()
        .collection('records')
        .add({ userId: userUniqueId, question, correct_answer, selected_answer })
        .then((snapshot) => snapshot)
        .catch(() => {
          throw new Error('저장 중 오류가 발생하였습니다.');
        });
    });
  } catch (error) {
    console.error(error);
  }
};

export default { fetchQuestion, fetchRecordQuiz };
