import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import images from '@themes/images';
import LeftIconButton from '@components/LeftIconButton';
import QuizModal from './QuizModal';

const Home = () => {
  const [quizModalVisible, setQuizModalVisible] = useState(false);

  const openQuizModal = useCallback(() => {
    setQuizModalVisible((prev) => !prev);
  }, []);

  const hideQuizModal = useCallback(() => {
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
