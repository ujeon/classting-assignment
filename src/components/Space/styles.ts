import styled from 'styled-components/native';

interface ContainerProps {
  width?: string;
  height?: string;
}

export const Container = styled.View<ContainerProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '10px'};
`;
