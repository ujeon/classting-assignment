import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@themes/images';
import LeftIconButton from '@components/LeftIconButton';
import QuizModal from './QuizModal';
import Quiz from '@store/modules/quiz';
import { RootStackParamList } from 'Router';
import { RootState } from '@store/index';
import Space from '@components/Space';
import { ButtonContainer, Container, LottieContainer, Title } from './styles';

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
    <>
      <SafeAreaView>
        <Container>
          <LottieContainer>
            <LottieView
              source={require('../../assets/lottie-girl-studying-on-laptop.json')}
              autoPlay
              loop
              style={{ position: 'absolute', bottom: 0, width: '100%' }}
            />
          </LottieContainer>
          <Title>QUIZ</Title>
          <ButtonContainer>
            <LeftIconButton source={images.iconPencil} title="퀴즈 시작" onPress={openQuizModal} />
            <Space height="27px" />
            <LeftIconButton
              source={images.iconCheck}
              title="오답 노트"
              onPress={moveQuizRecordScreen}
            />
          </ButtonContainer>
        </Container>
      </SafeAreaView>
      <QuizModal
        visible={quizModalVisible}
        hideModal={hideQuizModal}
        moveQuizResultScreen={moveQuizResultScreen}
      />
    </>
  );
};

export default Home;
