import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1
`
export const Header = styled.View`
  align-items: center;
  background-color: #28262e;
  flex-direction: row;
  padding: 24px;
  ${Platform.OS === 'ios' && `padding-top: ${getStatusBarHeight() + 24}px;`};
`

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`

export const BackButton = styled.TouchableOpacity``
