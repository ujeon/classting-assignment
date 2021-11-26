import colors from '@themes/colors';
import styled from 'styled-components/native';

interface ContainerProps {
  isCorrect: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  min-height: 20%;
  background-color: ${({ isCorrect }) => (isCorrect ? colors.australianMint : colors.palePink)};
  padding: 20px 15px;
`;

export const Title = styled.Text<ContainerProps>`
  color: ${({ isCorrect }) => (isCorrect ? colors.olive : colors.alizarin)};
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 12px;
`;

export const CorrectAnswer = styled.Text`
  color: ${colors.alizarin};
  margin-bottom: 12px;
`;
