import styled, { css } from "styled-components/native";
import FeatherIcon from 'react-native-vector-icons/Feather'

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}
interface IconProps {
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  background: #232129;
  border-radius: 10px;
  border-width: 2px;
  flex-direction: row;
  height: 60px;
  margin-bottom: 8px;
  padding: 0 16px;
  width: 100%;
  border-color: #232129;

  ${props => props.hasError && css`border-color: #c53030`};
  /* ${props => props.isFocused && css`border-color: #ff9000`} */

`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const Icon = styled(FeatherIcon) <IconProps>`
  margin-right: 16px;
  color: ${props => props.isFilled ? "#ff9000" : "#666360"};
`