import colors from '@themes/colors';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0px 10px;
`;

export const AnswersList = styled.View`
  justify-content: center;
  height: 100%;
  margin-top: 15px;
`;

export const QuestionTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${colors.darkGrey};
  margin-top: 10px;
`;

export const Category = styled.Text`
  color: ${colors.heliotrope};
  font-weight: bold;
  margin-top: 5px;
`;
