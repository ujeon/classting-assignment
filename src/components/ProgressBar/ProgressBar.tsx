import React, { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { Progress, ProgressContainer, Reflection, LeftPadding, RightPadding } from './styles';

type ProgressIndex = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

interface ProgressBarProps {
  progress: ProgressIndex;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  const progressAnimation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const leftPaddingAnimation = useRef(new Animated.ValueXY({ x: -10, y: 0 })).current;

  const changeWidth = useCallback(() => {
    Animated.timing(progressAnimation, {
      useNativeDriver: true,
      toValue: { x: 300 * progress, y: 0 },
      duration: 1500,
    }).start();

    Animated.timing(leftPaddingAnimation, {
      useNativeDriver: true,
      toValue: { x: progress ? 0 : -10, y: 0 },
      duration: progress ? 1500 : 2000,
    }).start();
  }, [progress, progressAnimation, leftPaddingAnimation]);

  useEffect(() => {
    changeWidth();
  }, [progress, progressAnimation, leftPaddingAnimation, changeWidth]);

  return (
    <ProgressContainer>
      <LeftPadding
        as={Animated.View}
        style={{ transform: [{ translateX: leftPaddingAnimation.x }] }}
      />
      <Progress as={Animated.View} style={{ transform: [{ translateX: progressAnimation.x }] }}>
        <RightPadding />
        <Reflection />
      </Progress>
    </ProgressContainer>
  );
};

export default ProgressBar;
