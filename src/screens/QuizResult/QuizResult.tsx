import React, { useMemo, useCallback, useEffect } from 'react';
import NavigationBar from '@components/NavigationBar';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IconButton from '@components/IconButton';
import images from '@themes/images';
import { RootStackParamList } from 'Router';
import { RootState } from '@store/index';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const QuizResult = ({ navigation }: NavigationProps) => {
  const { questions } = useSelector((store: RootState) => store.quiz);

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const $backButton = useMemo(
    () => <IconButton source={images.iconLeftArrow} onPress={handleBackButton} />,
    [handleBackButton],
  );

  useEffect(() => {
    console.log({ questions });
  }, [questions]);

  return (
    <SafeAreaView>
      <NavigationBar leftComponent={$backButton}></NavigationBar>
    </SafeAreaView>
  );
};

export default QuizResult;
