import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Button, Icon } from './styles';

interface IconButtonProps {
  source: ImageSourcePropType;
}

const IconButton: React.FC<IconButtonProps> = ({ source }) => {
  return (
    <Button>
      <Icon source={source} />
    </Button>
  );
};

export default IconButton;
