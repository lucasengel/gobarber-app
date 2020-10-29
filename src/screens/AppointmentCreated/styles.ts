import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 32px;
  margin-top: 48px;
  text-align: center;
`

export const Description = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  margin-top: 16px;
  text-align: center;
`

export const OkButton = styled(RectButton)`
  align-items: center;
  background-color: #ff9000;
  border-radius: 10px;
  justify-content: center;
  margin-top: 24px;
  padding: 12px 24px;
`

export const OkButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  margin-left: 8px;
`
