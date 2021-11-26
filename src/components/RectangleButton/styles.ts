import styled from 'styled-components/native';
import colors from '@themes/colors';
import { ButtonType } from './RectangleButton';

const handleButtonColorType = (color: ButtonType) => {
  switch (color) {
    case ButtonType.primary:
      return colors.kellyGreen;
    case ButtonType.danger:
      return colors.sunsetOrange;
    default:
      return colors.white;
  }
};

const handleButtonShadowColorType = (color: ButtonType) => {
  switch (color) {
    case ButtonType.primary:
      return colors.olive;
    case ButtonType.danger:
      return colors.alizarin;
    default:
      return colors.white;
  }
};

interface ButtonProps {
  type: ButtonType;
}

export const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const Button = styled.View<ButtonProps>`
  width: 100%;
  min-width: 200px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ type }) => handleButtonColorType(type)};
  border-radius: 12px;
  z-index: 10;
`;

export const ButtonShadow = styled.View<ButtonProps>`
  width: 100%;
  min-width: 200px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ type }) => handleButtonShadowColorType(type)};
  border-radius: 12px;
  position: absolute;
  top: 6px;
`;

export const Title = styled.Text`
  font-size: 17px;
  color: ${colors.white};
  font-weight: bold;
`;
