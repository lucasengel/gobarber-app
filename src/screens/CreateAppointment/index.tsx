import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth'
import DateTimePicker from '@react-native-community/datetimepicker'
import api from '../../services/api'
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  ProfileButton,
  Content,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerText,
  Title,
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText
} from './styles'
import { Alert, Platform } from 'react-native'
import { format } from 'date-fns'

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}
interface DayAvailabilityItem {
  day: number;
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { navigate, goBack } = useNavigation();
  const { user } = useAuth();
  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState([] as Provider[])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [dayAvailability, setDayAvailability] = useState<DayAvailabilityItem[]>([])

  useEffect(() => {
    api.get('/providers').then(({ data }) => {
      setProviders(data)
    })
  }, [])

  useEffect(() => {
    api.get(`/providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(({ data }) => {
      setDayAvailability(data)
    })
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(
    () => goBack(),
    [goBack],
  );

  const navigateToProfile = useCallback(
    () => { navigate('Profile') },
    [navigate],
  );

  const changeSelectedProvider = useCallback(
    (providerId: string) => setSelectedProvider(providerId),
    [setSelectedProvider],
  )

  const toggleDatePicker = useCallback(
    () => { setShowDatePicker(!showDatePicker) },
    [setShowDatePicker],
  )

  const handleDateChange = useCallback(
    (event: any, date: Date | undefined) => {
      setSelectedHour(0)
      if (Platform.OS === 'android') {
        setShowDatePicker(false)
      }

      if (date) setSelectedDate(date)

      setShowDatePicker(false)
    },
    [setShowDatePicker],
  )

  const morningAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 13)
      .map(({ hour, available }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00')
      }))
  }, [dayAvailability])

  const afternoonAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 13)
      .map(({ hour, available }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00')
      }))
  }, [dayAvailability])

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [setSelectedHour])

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate)

      date.setHours(selectedHour)
      date.setMinutes(0)

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date
      })

      navigate('AppointmentCreated', { date: date.getTime() })
    } catch (error) {
      Alert.alert('Error creating appointment', 'Please check your input')
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Providers</HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => changeSelectedProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderName
                selected={provider.id === selectedProvider}
              >
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Content>
        <Calendar>
          <CalendarTitle>Pick a date</CalendarTitle>
          <OpenDatePickerButton onPress={toggleDatePicker}>
            <Icon name="calendar" size={24} />
            <OpenDatePickerText>Open date picker</OpenDatePickerText>
          </OpenDatePickerButton>
          {showDatePicker && <DateTimePicker
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
            textColor="#f4ede8"
            value={selectedDate}
          />}
        </Calendar>

        <Schedule>
          <Title>Pick a time</Title>
          <Section>
            <SectionTitle>Morning</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hour, formattedHour, available }) => (
                <Hour
                  selected={selectedHour === hour}
                  enabled={available}
                  available={available}
                  onPress={() => handleSelectHour(hour)}
                  key={hour}
                >
                  <HourText selected={selectedHour === hour}>{formattedHour}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Afternoon</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ hour, formattedHour, available }) => (
                <Hour
                  selected={selectedHour === hour}
                  enabled={available}
                  available={available}
                  onPress={() => handleSelectHour(hour)}
                  key={hour}
                >
                  <HourText selected={selectedHour === hour}>{formattedHour}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>

        {selectedDate && selectedHour !== 0 && (
          <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>Book Appointment</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        )}
      </Content>
    </Container>
  )
}

export default CreateAppointment