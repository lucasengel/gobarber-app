import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? '150' : '40'}px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const BackToLoginButton = styled.TouchableOpacity`
  align-items: center;
  background: #312e38;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace() + 'px'};
`
export const BackToLoginButtonText = styled.Text`
  color: #ffffff;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`
export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
