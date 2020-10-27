import styled from "styled-components/native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FlatList, Platform } from "react-native";
import { Provider } from ".";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  align-items: center;
  background-color: #28262e;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  ${Platform.OS === 'ios' && `padding-top: ${getStatusBarHeight() + 24}px;`};

`

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  height: 56px;
  border-radius: 28px;
  width: 56px;
`
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`

export const ProviderListTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin-bottom: 24px;
`

export const ProviderContainer = styled(RectButton)`
  align-items: center;
  background-color: #3b3b47;
  border-radius: 10px;
  flex-direction: row;
  margin-bottom: 16px;
  padding: 20px;
`

export const ProviderAvatar = styled.Image`
  border-radius: 36px;
  height: 72px;
  width: 72px;
`

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`

export const ProviderName = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;

`

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const ProviderMetaText = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin-left: 8px;
`
