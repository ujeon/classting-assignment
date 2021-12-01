import colors from '@themes/colors';
import styled from 'styled-components/native';

export const LabelContainer = styled.View`
  padding: 15px 7px 15px 18px;
  border: 1px ${colors.gainsboro2};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

interface LabelProps {
  color: string;
}

export const Label = styled.Text`
  color: ${colors.darkGrey3};
  font-size: 17px;
`;

export const Content = styled.Text<LabelProps>`
  color: ${({ color }) => color};
  font-size: 16px;
  font-weight: bold;
  min-width: 75px;
  text-align: center;
`;

export const IconWithContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;
