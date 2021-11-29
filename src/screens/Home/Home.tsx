import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import images from '@themes/images';
import LeftIconButton from '@components/LeftIconButton';
import QuizModal from './QuizModal';
import Quiz from '@store/modules/quiz';
import { RootStackParamList } from 'Router';
import { RootState } from '@store/index';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const Home = ({ navigation }: NavigationProps) => {
  const { quizModalVisible } = useSelector((store: RootState) => store.quiz);

  const dispatch = useDispatch();

  const openQuizModal = useCallback(() => {
    dispatch(Quiz.actions.fetch.request(''));
    dispatch(Quiz.actions.toggleQuizModal(true));
  }, [dispatch]);

  const hideQuizModal = useCallback(() => {
    dispatch(Quiz.actions.toggleQuizModal(false));
  }, [dispatch]);

  const moveQuizResultScreen = useCallback(() => {
    navigation.navigate('QuizResult');
  }, [navigation]);

  const moveQuizRecordScreen = useCallback(() => {
    navigation.navigate('QuizRecord');
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LeftIconButton source={images.iconPencil} title="퀴즈 시작" onPress={openQuizModal} />
      <LeftIconButton source={images.iconCheck} title="오답 노트" onPress={moveQuizRecordScreen} />
      <QuizModal
        visible={quizModalVisible}
        hideModal={hideQuizModal}
        moveQuizResultScreen={moveQuizResultScreen}
      />
    </View>
  );
};

export default Home;
