import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import images from '@themes/images';
import LeftIconButton from '@components/LeftIconButton';
import QuizModal from './QuizModal';
import Quiz from '@store/modules/quiz';
import { RootStackParamList } from 'Router';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const Home = ({ navigation }: NavigationProps) => {
  const [quizModalVisible, setQuizModalVisible] = useState(false);

  const dispatch = useDispatch();

  const openQuizModal = useCallback(() => {
    dispatch(Quiz.actions.fetch.request(''));
    setQuizModalVisible((prev) => !prev);
  }, [dispatch]);

  const hideQuizModal = useCallback(() => {
    setQuizModalVisible((prev) => !prev);
  }, []);

  const moveQuizResultScreen = useCallback(() => {
    navigation.navigate('QuizResult');
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LeftIconButton source={images.iconPencil} title="퀴즈 시작" onPress={openQuizModal} />
      <QuizModal
        visible={quizModalVisible}
        hideModal={hideQuizModal}
        moveQuizResultScreen={moveQuizResultScreen}
      />
    </View>
  );
};

export default Home;
