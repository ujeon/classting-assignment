import React from 'react';
import renderer from 'react-test-renderer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import QuizResult from '@screens/QuizResult';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const createTestProps = (props: any) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe('Load QuizResult', () => {
  const props = createTestProps({});

  it('[QuizResult] render:', () => {
    const tree = renderer.create(<QuizResult {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
