import colors from '@themes/colors';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
`;

export const LottieContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.View`
  margin-top: 40px;
`;

export const QuizModalContainer = styled.View`
  padding: 0px 10px;
`;

export const Title = styled.Text`
  color: ${colors.shamrock};
  font-size: 90px;
  font-weight: bold;
  text-align: center;
  margin-top: 40px;
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
