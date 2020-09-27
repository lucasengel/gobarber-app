import React from 'react'
import { Image, Text } from 'react-native'

import { Container, Title } from './styles'

import logoImg from '../../assets/logo.png'

const LogIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg}/>
      <Title>Log In</Title>
    </Container>
  )
}

export default LogIn
