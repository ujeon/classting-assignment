import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import Settings from '@screens/Settings';
import QuizResult from '@screens/QuizResult';
import QuizRecord from '@screens/QuizRecord';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  QuizResult: undefined;
  QuizRecord: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="QuizResult" component={QuizResult} />
        <Stack.Screen name="QuizRecord" component={QuizRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
