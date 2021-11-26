import React, { useCallback } from 'react';
import { View } from 'react-native';
import images from '@themes/images';
import LeftIconButton from '@components/LeftIconButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'Router';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const Home = ({ navigation }: NavigationProps) => {
  const handleStartQuizButton = useCallback(() => {
    navigation.navigate('Quiz');
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LeftIconButton
        source={images.iconPencil}
        title="퀴즈 시작"
        onPress={handleStartQuizButton}
      />
    </View>
  );
};

export default Home;
