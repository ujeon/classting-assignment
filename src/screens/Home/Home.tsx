import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
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
  const { quizModalVisible, questions, currQuestionIndex, isComplete } = useSelector(
    (store: RootState) => store.quiz,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  const requestNewQuiz = useCallback(() => {
    dispatch(Quiz.actions.updateQuizComplete(false));
    dispatch(Quiz.actions.fetch.request(''));
    dispatch(Quiz.actions.toggleQuizModal(true));
  }, [dispatch]);

  const continuePrevQuiz = useCallback(() => {
    dispatch(Quiz.actions.toggleQuizModal(true));
  }, [dispatch]);

  const checkPrevQuizExist = useCallback(() => {
    return questions.length > 0 && currQuestionIndex < questions.length && !isComplete;
  }, [currQuestionIndex, questions.length, isComplete]);

  const openQuizModal = useCallback(() => {
    if (checkPrevQuizExist()) {
      Alert.alert('풀던 퀴즈가 있어요!', '퀴즈를 이어서 풀어볼까요? 🤗', [
        {
          text: '아니요',
          onPress: () => requestNewQuiz(),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => continuePrevQuiz(),
        },
      ]);
    } else {
      requestNewQuiz();
    }
  }, [requestNewQuiz, continuePrevQuiz, checkPrevQuizExist]);

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
