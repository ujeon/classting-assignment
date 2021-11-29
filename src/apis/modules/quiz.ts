import firestore from '@react-native-firebase/firestore';
import { Question, QuizRecord } from '@store/modules/quiz/reducer';
import uuid from 'react-native-uuid';
import _forEach from 'lodash/forEach';
import _map from 'lodash/map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createWrongAnswersRecord } from '@utils/quiz';
import { QuerySnapshot } from '@react-native-firebase';

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

export interface FetchGetRecordQuizRequest {}
export interface FetchGetRecordQuizResponse {
  results: QuizRecord[];
}
export interface FetchGetRecordQuizError {}

const fetchQuestion = (): Promise<FetchResponse> => {
  return fetch('https://opentdb.com/api.php?amount=10').then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<FetchResponse>;
  });
};

const fetchRecordQuiz = async (
  payload: FetchRecordQuizRequest,
): Promise<FetchRecordQuizResponse> => {
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
    _forEach(wrongAnswerRecord, ({ question, correct_answer, selected_answer, category }) => {
      firestore()
        .collection('records')
        .add({ userId: userUniqueId, question, correct_answer, selected_answer, category })
        .then((snapshot) => snapshot)
        .catch(() => {
          throw new Error('서버 요청 중 오류가 발생하였습니다.');
        });
    });
  } catch (error) {
    console.error(error);
  }
  return {};
};

const fetchGetRecordQuiz = async (): Promise<FetchGetRecordQuizResponse> => {
  let results: QuizRecord[] = [];
  const userUniqueId = await AsyncStorage.getItem('@userUniqueId');

  if (userUniqueId) {
    results = await firestore()
      .collection('records')
      .where('userId', '==', userUniqueId)
      .get()
      .then((querySnapshot) => {
        const { docs } = querySnapshot;
        return _map(docs, (doc) => doc.data() as QuizRecord);
      })
      .catch(() => {
        throw new Error('서버 요청 중 오류가 발생하였습니다.');
      });
  }
  console.log({ results });
  return { results };
};

export default { fetchQuestion, fetchRecordQuiz, fetchGetRecordQuiz };
