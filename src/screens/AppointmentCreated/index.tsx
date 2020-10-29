import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import React, { useCallback, useMemo } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles'

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation()
  const { params } = useRoute()

  const routeParams = params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "EEEE, LLLL do 'at' h:mma")
  }, [routeParams.date])

  const handleOkPress = useCallback(
    () => {
      reset({
        routes: [{ name: 'Dashboard' }],
        index: 0
      })
    },
    [reset],
  )

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Appointment Booked</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleOkPress}>
        <OkButtonText>Thanks</OkButtonText>
      </OkButton>
    </Container>
  )
}

export default AppointmentCreated
