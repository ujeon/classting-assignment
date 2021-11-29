import colors from '@themes/colors';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  padding: 30px 15px 24px 15px;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: ${colors.goldenPoppy};
  width: 100%;
  text-align: center;
`;

export const ChartContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
