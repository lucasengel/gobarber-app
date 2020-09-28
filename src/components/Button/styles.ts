import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  align-items: center;
  background: #ff9000;
  border-radius: 10px;
  height: 60px;
  justify-content: center;
  margin-top: 8px;
  min-width: 100%;
  width: 100%;
`

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`