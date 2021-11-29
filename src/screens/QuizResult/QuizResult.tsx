import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import images from '@themes/images';
import { RootStackParamList } from 'Router';
import { RootState } from '@store/index';
import RightIconTextLabel from '@components/RightIconTextLabel';
import colors from '@themes/colors';
import RectangleButton from '@components/RectangleButton';
import { ButtonType } from '@components/RectangleButton/RectangleButton';
import { Container } from './styles';
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
        <RightIconTextLabel
          title="소요 시간"
          content={`${elapsedTime.hh}° ${elapsedTime.mm}' ${elapsedTime.ss}"`}
          contentColor={colors.darkGrey}
          source={images.iconTiming}
        />
        <Space height="24px" />
        <RightIconTextLabel
          title="정답"
          content={`${correctAnswerCount}개`}
          contentColor={colors.kellyGreen}
          source={images.iconAssignmentCorrect}
        />
        <Space height="24px" />
        <RightIconTextLabel
          title="오답"
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
