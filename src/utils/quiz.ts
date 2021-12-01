import _map from 'lodash/map';
import _shuffle from 'lodash/shuffle';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import { QuestionType, Answer, Question } from '@store/modules/quiz/reducer';
import { decodeHtmlEntity } from './common';

const createAnswers = (
  type: QuestionType,
  correctAnswer: string,
  incorrectAnswers: string[],
): Answer[] => {
  const tempAnswers = [...incorrectAnswers, correctAnswer];
  let answers: Answer[] = _map(tempAnswers, (answer): Answer => {
    return { option: decodeHtmlEntity(answer), isSelected: false };
  });
  if (type === 'multiple') {
    answers = _shuffle(answers);
  } else if (type === 'boolean') {
    answers = _sortBy(answers, (answer: Answer) => answer.option).reverse();
  }
  return answers;
};

export const formatQuestions = (questions: Question[]): Question[] => {
  return _map(questions, (question: Question) => {
    question.question = decodeHtmlEntity(question.question);
    question.category = decodeHtmlEntity(question.category);
    question.correct_answer = decodeHtmlEntity(question.correct_answer);

    const answers: Answer[] = createAnswers(
      question.type,
      question.correct_answer,
      question.incorrect_answers,
    );
    question.answers = answers;

    return question;
  });
};

interface QuizRecord {
  question: string;
  correct_answer: string;
  selected_answer: string;
  category: string;
}

export const createWrongAnswersRecord = (questions: Question[]): QuizRecord[] => {
  const wrongAnswers: Question[] = _filter(questions, ({ isCorrect }) => !isCorrect);
  return _map(wrongAnswers, ({ question, correct_answer, answers, category }) => {
    return {
      category,
      question,
      correct_answer,
      selected_answer: _find(answers, ({ isSelected }) => isSelected)?.option ?? '',
    };
  });
};
