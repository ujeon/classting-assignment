import colors from '@themes/colors';
import styled from 'styled-components/native';

export const PieContainer = styled.View`
  width: 300px;
  height: 300px;
`;

export const RatioContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RatioTitle = styled.Text`
  color: ${colors.darkGrey2};
  font-size: 15px;
`;

export const Ratio = styled.Text`
  color: ${colors.darkGrey};
  font-size: 35px;
  font-weight: bold;
`;
