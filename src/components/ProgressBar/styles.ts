import colors from '@themes/colors';
import styled from 'styled-components/native';

export const ProgressContainer = styled.View`
  overflow: hidden;
  width: 250px;
  height: 20px;
  background-color: ${colors.gainsboro};
  border-radius: 25px;
`;

export const Progress = styled.View`
  width: 250px;
  height: 20px;
  position: absolute;
  left: -250px;
  background-color: ${colors.kellyGreen};
  border-radius: 25px;
  overflow: hidden;
`;

export const Reflection = styled.View`
  width: 250px;
  height: 5px;
  background-color: ${colors.yellowGreen};
  border-radius: 30px;
  top: 5px;
`;

export const LeftPadding = styled.View`
  width: 10px;
  height: 20px;
  position: absolute;
  background-color: ${colors.kellyGreen};
  left: 0px;
  z-index: 20;
`;

export const RightPadding = styled.View`
  width: 10px;
  height: 20px;
  position: absolute;
  background-color: ${colors.kellyGreen};
  right: 0px;
  z-index: 20;
`;
