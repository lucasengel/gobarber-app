import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { BackButton, Container, Header, HeaderTitle } from './styles'

const Profile: React.FC = () => {
  const { logOut } = useAuth();
  const { goBack } = useNavigation();

  const navigateBack = useCallback(
    () => goBack(),
    [goBack],
  );

  const handleLogOut = () => {
    logOut()
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Profile</HeaderTitle>
      </Header>

      <Button onPress={handleLogOut}>
        log out
      </Button>
    </Container>
  )
}

export default Profile
