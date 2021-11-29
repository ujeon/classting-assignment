import styled from 'styled-components/native';
import colors from '@themes/colors';

export const Container = styled.View``;

export const QuestionTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${colors.darkGrey};
  margin-top: 10px;
`;

export const CardList = styled.View`
  align-items: center;
  margin-top: 15px;
  margin-bottom: 50px;
`;

export const Card = styled.View`
  border: 1px ${colors.gainsboro2};
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 30px 20px;
`;

export const AnswerLabel = styled.Text`
  color: ${colors.darkGrey3};
`;

export const Category = styled.Text`
  color: ${colors.heliotrope};
  font-weight: bold;
  margin-top: 5px;
`;

export const EmptyListText = styled.Text`
  color: ${colors.darkGrey3};
  margin-top: 100px;
  text-align: center;
  font-size: 20px;
`;

export const Title = styled.Text`
  color: ${colors.darkGrey};
  font-size: 30px;
  font-weight: bold;
  padding-left: 20px;
`;
