import React from 'react';
import { Container, Title, CorrectAnswer } from './styles';
import RectangleButton from '@components/RectangleButton';
import { ButtonType } from '@components/RectangleButton/RectangleButton';

interface SelectResultContainerProps {
  isCorrect: boolean;
  correctAnswer: string;
}

const SelectResultContainer: React.FC<SelectResultContainerProps> = ({
  isCorrect,
  correctAnswer,
}) => {
  return (
    <Container isCorrect={isCorrect}>
      <Title isCorrect={isCorrect}>{isCorrect ? '정답입니다!' : '정답 : '}</Title>
      {!isCorrect && <CorrectAnswer>{correctAnswer}</CorrectAnswer>}
      <RectangleButton type={isCorrect ? ButtonType.primary : ButtonType.danger} title="계속하기" />
    </Container>
  );
};

export default SelectResultContainer;
