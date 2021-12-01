import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import QuizResult from '@screens/QuizResult';
import QuizRecord from '@screens/QuizRecord';
import colors from '@themes/colors';

export type RootStackParamList = {
  Home: undefined;
  QuizResult: undefined;
  QuizRecord: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <NavigationContainer
      theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.white } }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="QuizResult" component={QuizResult} />
        <Stack.Screen name="QuizRecord" component={QuizRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
