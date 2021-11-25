import React from 'react';
import { ImageSourcePropType } from 'react-native';
import {
 Button, ButtonContainer, ButtonShadow, Icon, Title 
} from './styles';

interface LeftIconButtonProps {
  source: ImageSourcePropType;
  title: string;
}

const LeftIconButton: React.FC<LeftIconButtonProps> = function LeftIconButton({
  source,
  title,
}) {
  return (
    <ButtonContainer>
      <Button>
        <Icon source={source} />
        <Title>{title}</Title>
      </Button>
      <ButtonShadow />
    </ButtonContainer>
  );
};

export default LeftIconButton;
