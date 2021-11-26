import colors from '@themes/colors';
import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
`;

export const Icon = styled.Image`
  width: 100%;
  height: 100%;
  tint-color: ${colors.darkGrey2};
`;
