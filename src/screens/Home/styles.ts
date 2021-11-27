import colors from '@themes/colors';
import styled from 'styled-components/native';

export const QuizModalContainer = styled.View`
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

export const AnswerResultModalContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

export const DimmedLayer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${colors.darkGreyDimmed};
`;
