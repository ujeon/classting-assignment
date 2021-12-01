import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Button, Icon } from './styles';

interface IconButtonProps {
  source: ImageSourcePropType;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ source, onPress }) => {
  return (
    <Button onPress={onPress}>
      <Icon source={source} />
    </Button>
  );
};

export default IconButton;
