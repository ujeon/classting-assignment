import _map from 'lodash/map';
import _shuffle from 'lodash/shuffle';
import _sortBy from 'lodash/sortBy';
import { QuestionType, Answer, Question } from '@store/modules/quiz/reducer';

const createAnswers = (
  type: QuestionType,
  correctAnswer: string,
  incorrectAnswers: string[],
): Answer[] => {
  const tempAnswers = [...incorrectAnswers, correctAnswer];
  let answers: Answer[] = _map(tempAnswers, (answer): Answer => {
    return { option: answer, isSelected: false };
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
    const answers: Answer[] = createAnswers(
      question.type,
      question.correct_answer,
      question.incorrect_answers,
    );
    question.answers = answers;

    return question;
  });
};
