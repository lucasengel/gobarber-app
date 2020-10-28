import { FlatList, Platform } from "react-native";
import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Provider } from ".";
import { RectButton } from "react-native-gesture-handler";

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1
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
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`

export const BackButton = styled.TouchableOpacity``

export const ProfileButton = styled.TouchableOpacity``

export const Content = styled.ScrollView``

export const UserAvatar = styled.Image`
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
  width: 56px;
`

export const ProvidersListContainer = styled.View`
  height: 112px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`

export const ProviderContainer = styled(RectButton) <ProviderContainerProps>`
  align-items: center;
  background-color: ${({ selected }) => selected ? '#ff9000' : '#28262e'};
  border-radius: 10px;
  flex-direction: row;
  margin-right: 16px;
  padding: 8px 16px;
`

export const ProviderAvatar = styled.Image`
  border-radius: 16px;
  height: 32px;
  margin-right: 8px;
  width: 32px;
`

export const ProviderName = styled.Text<ProviderNameProps>`
  color: ${({ selected }) => selected ? '#232129' : '#f4ede8'};
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  margin-left: 8px;
`

export const Calendar = styled.View``

export const OpenDatePickerButton = styled(RectButton)`
  align-items: center;
  background-color: #ff9000;
  border-radius: 10px;
  flex-direction: row;
  height: 46px;
  justify-content: center;
  margin: 0 24px;
`

export const OpenDatePickerText = styled.Text`
  color: #232129;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  margin-left: 8px;
`

export const CalendarTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin: 0 24px 24px 24px;
`

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`

export const Section = styled.View`
  margin-bottom: 24px;
`

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})``

export const Hour = styled(RectButton) <HourProps>`
  background-color: ${({ selected }) => selected ? '#ff9000' : '#3e3b47'};
  border-radius: 10px;
  margin-right: 8px;
  padding: 12px;
  ${({ available }) => !available && 'opacity: .3'}
`

export const HourText = styled.Text<HourTextProps>`
  color: ${({ selected }) => selected ? '#232129' : '#f4ede8'};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`

export const CreateAppointmentButton = styled(RectButton)`
  align-items: center;
  background-color: #ff9000;
  border-radius: 10px;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  margin: 0 24px 24px;
`

export const CreateAppointmentButtonText = styled.Text`
  color: #232129;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  margin-left: 8px;
`