import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container } from './styles';
import { RootStackParamList } from 'Router';
import NavigationBar from '@components/NavigationBar';
import IconButton from '@components/IconButton';
import images from '@themes/images';
import Quiz from '@store/modules/quiz';
import { RootState } from '@store/index';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const QuizRecord = ({ navigation }: NavigationProps) => {
  const { quizRecord } = useSelector((store: RootState) => store.quiz);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Quiz.actions.fetchGetRecordQuiz.request(''));
  }, [dispatch]);

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const $backButton = useMemo(
    () => <IconButton source={images.iconLeftArrow} onPress={handleBackButton} />,
    [handleBackButton],
  );

  return (
    <SafeAreaView>
      <Container>
        <NavigationBar leftComponent={$backButton} />
      </Container>
    </SafeAreaView>
  );
};

export default QuizRecord;
