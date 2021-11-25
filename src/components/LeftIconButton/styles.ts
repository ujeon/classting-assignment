import styled from 'styled-components/native';
import colors from '@themes/colors';

export const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const Button = styled.View`
  width: 250px;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  z-index: 10;
  background-color: ${colors.white};
  border: 1px ${colors.shamrock};
  padding: 0px 20px 0px 20px;
`;

export const ButtonShadow = styled.View`
  width: 250px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  position: absolute;
  background-color: ${colors.shamrock};
  top: 6;
`;

export const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #303030;
  text-align: center;
  flex: 1;
`;

export const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;
