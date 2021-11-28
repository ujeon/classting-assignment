import { Question } from '@store/modules/quiz/reducer';

export interface FetchRequest {}

export interface FetchResponse {
  status: string;
  response_code: number;
  results: Question[];
}

export interface FetchError {
  message: string;
}

const fetchQuestion = (): Promise<FetchResponse> => {
  return fetch('https://opentdb.com/api.php?amount=10').then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<FetchResponse>;
  });
};

export default { fetchQuestion };
