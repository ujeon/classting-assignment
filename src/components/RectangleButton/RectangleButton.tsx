import React from 'react';
import { ButtonContainer, Button, ButtonShadow, Title } from './styles';

export enum ButtonType {
  primary,
  danger,
}

interface ButtonProps {
  title: string;
  type: ButtonType;
}

const RectangleButton: React.FC<ButtonProps> = function RectangleButton({
  title,
  type,
}) {
  return (
    <ButtonContainer>
      <Button type={type}>
        <Title>{title}</Title>
      </Button>
      <ButtonShadow type={type} />
    </ButtonContainer>
  );
};

export default RectangleButton;
