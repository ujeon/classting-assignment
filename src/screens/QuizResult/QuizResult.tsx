import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import images from '@themes/images';
import { RootStackParamList } from 'Router';
import { Container, ChartContainer, Title } from './styles';
import { RootState } from '@store/index';
import colors from '@themes/colors';
import Chart from '@components/Chart';
import RightIconTextLabel from '@components/RightIconTextLabel';
import RectangleButton from '@components/RectangleButton';
import { ButtonType } from '@components/RectangleButton/RectangleButton';
import Space from '@components/Space';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const QuizResult = ({ navigation }: NavigationProps) => {
  const { questions, elapsedTime, inCorrectAnswerCount, correctAnswerCount } = useSelector(
    (store: RootState) => store.quiz,
  );

  useEffect(() => {
    console.log({ elapsedTime });
  }, [elapsedTime]);

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    console.log({ questions });
  }, [questions]);

  return (
    <SafeAreaView>
      <Container>
        <Space height="20px" />
        <Title>퀴즈 완료!</Title>
        <ChartContainer>
          <Chart
            totalCount={correctAnswerCount + inCorrectAnswerCount}
            correctAnswerCount={correctAnswerCount}
            inCorrectAnswerCount={inCorrectAnswerCount}
          />
        </ChartContainer>
        <Space height="15px" />
        <RightIconTextLabel
          title="소요 시간"
          content={`${elapsedTime.hh}° ${elapsedTime.mm}' ${elapsedTime.ss}"`}
          contentColor={colors.darkGrey}
          source={images.iconTiming}
        />
        <Space height="24px" />
        <RightIconTextLabel
          title="정답 수"
          content={`${correctAnswerCount}개`}
          contentColor={colors.kellyGreen}
          source={images.iconAssignmentCorrect}
        />
        <Space height="24px" />
        <RightIconTextLabel
          title="오답 수"
          content={`${inCorrectAnswerCount}개`}
          contentColor={colors.sunsetOrange}
          source={images.iconAssignmentInCorrect}
        />
        <Space height="100px" />
        <RectangleButton
          type={ButtonType.secondary}
          title="확인했어요!"
          onPress={handleBackButton}
        />
      </Container>
    </SafeAreaView>
  );
};

export default QuizResult;
