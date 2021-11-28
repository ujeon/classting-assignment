import React, { useState, useCallback, useMemo } from 'react';
import { Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _map from 'lodash/map';
import MultipleChoiceOption from '@components/MultipleChoiceOption';
import ProgressBar from '@components/ProgressBar';
import images from '@themes/images';
import IconButton from '@components/IconButton';
import NavigationBar from '@components/NavigationBar';
import { AnswersList, QuestionTitle, QuizModalContainer, Category, DimmedLayer } from './styles';
import AnswerResultModal from './AnswerResultModal';

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
      { option: 'Albania', isSelected: false },
      { option: 'Croatia', isSelected: false },
      { option: 'Serbia', isSelected: false },
      { option: 'Macedonia', isSelected: false },
    ],
  },
  {
    id: '2352345234234',
    category: 'Entertainment: Music',
    type: 'boolean',
    difficulty: 'medium',
    question:
      'Norwegian producer Kygo released a remix of the song &quot;Sexual Healing&quot; by Marvin Gaye.',
    correctAnswer: 'True',
    incorrectAnswers: ['False'],
    answers: [
      { option: 'True', isSelected: false },
      { option: 'False', isSelected: false },
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
  isSelected: boolean;
}

const QuizModal: React.FC<QuizModalProps> = ({ visible, hideModal }) => {
  const [questionList, setQuestionList] = useState<Array<Question>>(sampleData);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const updateSelectedOption = useCallback(
    (selectedOption: string) => {
      setQuestionList((prev) => {
        const prevQuestion = [...prev];
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
      setIsCorrectAnswer(questionList[currQuestionIndex].correctAnswer === selectedOption);
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

  const handleContinueButtonPress = useCallback(() => {
    if (currQuestionIndex < questionList.length - 1) {
      setResultModalVisible(false);
      setCurrQuestionIndex((prev) => prev + 1);
    } else {
      hideModal();
    }
  }, [currQuestionIndex, questionList, hideModal]);

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
        <QuizModalContainer>
          <Category>{questionList[currQuestionIndex].category}</Category>
          <QuestionTitle>{questionList[currQuestionIndex].question}</QuestionTitle>
          <AnswersList>
            <FlatList
              data={questionList[currQuestionIndex].answers}
              renderItem={renderMultipleChoiceOptions}
            />
          </AnswersList>
        </QuizModalContainer>
        {resultModalVisible && <DimmedLayer />}
      </SafeAreaView>
      <AnswerResultModal
        visible={resultModalVisible}
        isCorrect={isCorrectAnswer}
        correctAnswer={questionList[currQuestionIndex].correctAnswer}
        onPress={handleContinueButtonPress}
      />
    </Modal>
  );
};

export default QuizModal;
