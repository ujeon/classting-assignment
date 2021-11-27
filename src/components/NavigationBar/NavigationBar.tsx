import React from 'react';
import { Container, Space } from './styles';

interface NavigationBarProps {
  leftComponent?: React.ReactElement;
  centerComponent?: React.ReactElement;
  rightComponent?: React.ReactElement;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  leftComponent,
  centerComponent,
  rightComponent,
}) => {
  return (
    <Container>
      {leftComponent || <Space></Space>}
      {centerComponent || <Space></Space>}
      {rightComponent || <Space></Space>}
    </Container>
  );
};

export default NavigationBar;
