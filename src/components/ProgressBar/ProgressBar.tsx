import React, { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { Progress, ProgressContainer, Reflection, LeftPadding, RightPadding } from './styles';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  const progressAnimation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const leftPaddingAnimation = useRef(new Animated.ValueXY({ x: -10, y: 0 })).current;

  const changeWidth = useCallback(() => {
    Animated.timing(progressAnimation, {
      useNativeDriver: true,
      toValue: { x: 250 * progress, y: 0 },
      duration: 300,
    }).start();

    Animated.timing(leftPaddingAnimation, {
      useNativeDriver: true,
      toValue: { x: progress ? 0 : -10, y: 0 },
      duration: progress ? 300 : 500,
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
