import React from 'react'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'

const Profile: React.FC = () => {
  const { logOut } = useAuth()

  const handleLogOut = () => {
    logOut()
  }

  return (
    <Button onPress={handleLogOut}>
      log out
    </Button>
  )
}

export default Profile
