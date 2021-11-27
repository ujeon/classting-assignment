import React from 'react';
import { ButtonContainer, Button, ButtonShadow, Title } from './styles';

export enum ButtonType {
  primary,
  danger,
}

interface ButtonProps {
  title: string;
  type: ButtonType;
  onPress: () => void;
}

const RectangleButton: React.FC<ButtonProps> = ({ title, type, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <Button type={type}>
        <Title>{title}</Title>
      </Button>
      <ButtonShadow type={type} />
    </ButtonContainer>
  );
};

export default RectangleButton;
