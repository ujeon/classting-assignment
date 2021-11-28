import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Modal, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultipleChoiceOption from '@components/MultipleChoiceOption';
import ProgressBar from '@components/ProgressBar';
import images from '@themes/images';
import IconButton from '@components/IconButton';
import NavigationBar from '@components/NavigationBar';
import { AnswersList, QuestionTitle, QuizModalContainer, Category, DimmedLayer } from './styles';
import AnswerResultModal from './AnswerResultModal';
import { RootState } from '@store/index';
import Quiz from '@store/modules/quiz';
import { Answer } from '@store/modules/quiz/reducer';

interface QuizModalProps {
  visible: boolean;
  hideModal: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ visible, hideModal }) => {
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const dispatch = useDispatch();
  const { questions, currQuestionIndex } = useSelector((store: RootState) => store.quiz);

  const updateSelectedOption = useCallback(
    (selectedOption: string) => {
      dispatch(
        Quiz.actions.updateSelectedAnswer({
          questionIndex: currQuestionIndex,
          selectedOption: selectedOption,
        }),
      );
    },
    [dispatch, currQuestionIndex],
  );

  const compareCorrectAnswer = useCallback(
    (selectedOption: string) => {
      setIsCorrectAnswer(questions[currQuestionIndex].correct_answer === selectedOption);
    },
    [questions, currQuestionIndex],
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
    if (currQuestionIndex < questions.length - 1) {
      setResultModalVisible(false);
      dispatch(Quiz.actions.updateCurrQuestionIndex({ index: currQuestionIndex + 1 }));
    } else {
      hideModal();
      setResultModalVisible(false);
      setIsCorrectAnswer(false);
    }
  }, [currQuestionIndex, questions, hideModal, dispatch]);

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
          <Category>{questions[currQuestionIndex]?.category}</Category>
          <QuestionTitle>{questions[currQuestionIndex]?.question}</QuestionTitle>
          <AnswersList>
            <FlatList
              data={questions[currQuestionIndex]?.answers}
              renderItem={renderMultipleChoiceOptions}
            />
          </AnswersList>
        </QuizModalContainer>
        {resultModalVisible && <DimmedLayer />}
      </SafeAreaView>
      <AnswerResultModal
        visible={resultModalVisible}
        isCorrect={isCorrectAnswer}
        correctAnswer={questions[currQuestionIndex]?.correct_answer}
        onPress={handleContinueButtonPress}
      />
    </Modal>
  );
};

export default QuizModal;
