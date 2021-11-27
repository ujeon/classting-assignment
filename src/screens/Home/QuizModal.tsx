import React, { useState, useCallback, useMemo } from 'react';
import { Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _map from 'lodash/map';
import MultipleChoiceOption from '@components/MultipleChoiceOption';
import ProgressBar from '@components/ProgressBar';
import images from '@themes/images';
import IconButton from '@components/IconButton';
import NavigationBar from '@components/NavigationBar';
import { AnswersList, QuestionTitle, Container, Category } from './styles';
// import SelectResultContainer from '@components/SelectResultContainer';

const sampleData: Array<Question> = [
  {
    id: '12412421434',
    category: 'Geography',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Which country was NOT formerly part of Yugoslavia?',
    correctAnswer: 'Albania',
    incorrectAnswers: ['Croatia', 'Serbia', 'Macedonia'],
    answers: [
      { option: 'Albania', isCorrect: true, isSelected: false },
      { option: 'Croatia', isCorrect: false, isSelected: false },
      { option: 'Serbia', isCorrect: false, isSelected: false },
      { option: 'Macedonia', isCorrect: false, isSelected: false },
    ],
  },
];

interface QuizModalProps {
  visible: boolean;
  hideModal: () => void;
}

interface Question {
  id: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  answers: Array<Answer>;
}

interface Answer {
  option: string;
  isCorrect: boolean;
  isSelected: boolean;
}

const QuizModal: React.FC<QuizModalProps> = ({ visible, hideModal }) => {
  const [questionList, setQuestionList] = useState<Array<Question>>(sampleData);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const updateSelectedOption = useCallback(
    (selectedOption: string) => {
      setQuestionList((prev) => {
        const prevQuestion = { ...prev };
        const { answers } = prevQuestion[currQuestionIndex];
        const updatedAnswers = _map(answers, (answer) => {
          const updatedAnswer = { ...answer };
          updatedAnswer.isSelected = updatedAnswer.option === selectedOption;
          return updatedAnswer;
        });
        prevQuestion[currQuestionIndex].answers = updatedAnswers;
        return prevQuestion;
      });
    },
    [setQuestionList, currQuestionIndex],
  );

  const compareCorrectAnswer = useCallback(
    (selectedOption: string) => {
      console.log({
        isCorrectAnswer: questionList[currQuestionIndex].correctAnswer === selectedOption,
      });
    },
    [questionList, currQuestionIndex],
  );

  const handleOptionPress = useCallback(
    (selectedOption: string) => () => {
      setResultModalVisible(true);
      updateSelectedOption(selectedOption);
      compareCorrectAnswer(selectedOption);
    },
    [updateSelectedOption, compareCorrectAnswer],
  );

  const renderMultipleChoiceOptions = useCallback(
    ({ item }: { item: Answer }) => {
      console.log({ item });
      return (
        <MultipleChoiceOption
          selected={item.isSelected}
          contents={item.option}
          onPress={handleOptionPress(item.option)}
        />
      );
    },
    [handleOptionPress],
  );

  const handleBackButton = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const $cancelButton = useMemo(
    () => <IconButton source={images.iconCancel} onPress={handleBackButton} />,
    [handleBackButton],
  );

  const $progressBar = useMemo(
    () => <ProgressBar progress={0.1 * (currQuestionIndex + 1)} />,
    [currQuestionIndex],
  );

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView>
        <NavigationBar leftComponent={$cancelButton} centerComponent={$progressBar} />
        <Container>
          <Category>{questionList[currQuestionIndex].category}</Category>
          <QuestionTitle>{questionList[currQuestionIndex].question}</QuestionTitle>
          <AnswersList>
            <FlatList
              data={questionList[currQuestionIndex].answers}
              renderItem={renderMultipleChoiceOptions}
            />
          </AnswersList>
          {/* <SelectResultContainer isCorrect={false} correctAnswer="123123213" />
        <SelectResultContainer isCorrect={true} correctAnswer="123123213" /> */}
        </Container>
      </SafeAreaView>
    </Modal>
  );
};

export default QuizModal;
