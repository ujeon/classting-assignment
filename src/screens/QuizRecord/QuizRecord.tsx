import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Container,
  QuestionTitle,
  CardList,
  Card,
  AnswerLabel,
  Category,
  EmptyListText,
  Title,
} from './styles';
import { RootStackParamList } from 'Router';
import NavigationBar from '@components/NavigationBar';
import IconButton from '@components/IconButton';
import images from '@themes/images';
import Quiz from '@store/modules/quiz';
import { RootState } from '@store/index';
import { QuizRecord as QuizRecordType } from '@store/modules/quiz/reducer';
import MultipleChoiceOption from '@components/MultipleChoiceOption';
import Space from '@components/Space';

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

  const renderMultipleChoiceOptions = useCallback(({ item }: { item: QuizRecordType }) => {
    return (
      <Card>
        <Category>{item.category}</Category>
        <QuestionTitle>{item.question}</QuestionTitle>
        <Space height="18px" />
        <AnswerLabel>내가 선택한 답</AnswerLabel>
        <MultipleChoiceOption selected={false} contents={item.selected_answer} onPress={() => {}} />
        <Space height="18px" />
        <AnswerLabel>정답</AnswerLabel>
        <MultipleChoiceOption selected={true} contents={item.correct_answer} onPress={() => {}} />
      </Card>
    );
  }, []);

  const $backButton = useMemo(
    () => <IconButton source={images.iconLeftArrow} onPress={handleBackButton} />,
    [handleBackButton],
  );

  if (!quizRecord.length) {
    return (
      <SafeAreaView>
        <NavigationBar leftComponent={$backButton} />
        <Title>오답 노트</Title>
        <EmptyListText>오답 목록이 없어요 :D</EmptyListText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <NavigationBar leftComponent={$backButton} />
      <Title>오답 노트</Title>
      <Container>
        <CardList>
          <FlatList data={quizRecord} renderItem={renderMultipleChoiceOptions} />
        </CardList>
      </Container>
    </SafeAreaView>
  );
};

export default QuizRecord;
