import React from 'react';
import { Container } from './styles';

interface SpaceProps {
  width?: string;
  height?: string;
}

const Space: React.FC<SpaceProps> = ({ width, height }) => {
  return <Container width={width} height={height} />;
};

export default Space;
