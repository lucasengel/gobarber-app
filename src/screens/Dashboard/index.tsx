import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button onPress={handleLogOut}>Log out</Button>
    </View>
  )
}

export default Dashboard
