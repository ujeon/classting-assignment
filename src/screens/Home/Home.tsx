import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import images from '@themes/images';
import LeftIconButton from '@components/LeftIconButton';
import QuizModal from './QuizModal';
import Quiz from '@store/modules/quiz';

const Home = () => {
  const [quizModalVisible, setQuizModalVisible] = useState(false);

  const dispatch = useDispatch();

  const openQuizModal = useCallback(() => {
    dispatch(Quiz.actions.fetch.request(''));
    setQuizModalVisible((prev) => !prev);
  }, [dispatch]);

  const hideQuizModal = useCallback(() => {
    setQuizModalVisible((prev) => !prev);
  }, []);

  const handleQuizEnd = useCallback(() => {
    setQuizModalVisible((prev) => !prev);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LeftIconButton source={images.iconPencil} title="퀴즈 시작" onPress={openQuizModal} />
      <QuizModal visible={quizModalVisible} hideModal={hideQuizModal}></QuizModal>
    </View>
  );
};

export default Home;
