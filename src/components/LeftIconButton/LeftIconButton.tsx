import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Button, ButtonContainer, ButtonShadow, Icon, Title } from './styles';

interface LeftIconButtonProps {
  source: ImageSourcePropType;
  title: string;
  onPress: () => void;
}

const LeftIconButton: React.FC<LeftIconButtonProps> = ({ source, title, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <Button>
        <Icon source={source} />
        <Title>{title}</Title>
      </Button>
      <ButtonShadow />
    </ButtonContainer>
  );
};

export default LeftIconButton;
