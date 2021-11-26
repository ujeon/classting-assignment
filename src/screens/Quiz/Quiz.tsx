import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MultipleChoiceOption from '@components/MultipleChoiceOption';
import ProgressBar from '@components/ProgressBar';
import RectangleButton from '@components/RectangleButton';
import { ButtonType } from '@components/RectangleButton/RectangleButton';
import SelectResultContainer from '@components/SelectResultContainer';
import images from '@themes/images';
import IconButton from '@components/IconButton';
import { RootStackParamList } from 'Router';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Quiz'>;
}

const Quiz = ({ navigation }: NavigationProps) => {
  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView>
      <IconButton source={images.iconCancel} onPress={handleBackButton} />
      <ProgressBar progress={0.5} />
      <MultipleChoiceOption
        selected
        contents="asdasdsadasdasdasdasddfds fdsfsdfsdfsdg sdfsdf sdfsdf sd fsdsdasd asd as dadasdasdas sadasdsad"
      />
      <MultipleChoiceOption selected={false} contents="false" />
      <SelectResultContainer isCorrect={false} correctAnswer="123123213" />
      <SelectResultContainer isCorrect={true} correctAnswer="123123213" />
    </SafeAreaView>
  );
};

export default Quiz;
