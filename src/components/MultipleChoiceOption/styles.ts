import colors from '@themes/colors';
import styled from 'styled-components/native';

interface OptionProps {
  selected: boolean;
}

export const OptionContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const Option = styled.View<OptionProps>`
  width: 100%;
  min-height: 50px;
  background-color: ${({ selected }) => (selected ? colors.lightCyan : colors.white)};
  border-radius: 12px;
  border: 1px ${({ selected }) => (selected ? colors.lightSkyBlue : colors.gainsboro)};
  justify-content: center;
  padding: 5px 13px;
  z-index: 10;
`;

export const OptionShadow = styled.View<OptionProps>`
  width: 100%;
  min-height: 50px;
  background-color: ${({ selected }) => (selected ? colors.lightSkyBlue : colors.gainsboro)};
  position: absolute;
  border-radius: 12px;
  top: 3px;
`;

export const Contents = styled.Text<OptionProps>`
  color: ${({ selected }) => (selected ? colors.dodgerBlue : colors.darkGrey)};
`;
