import React from 'react'
import { Image, Text } from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Title } from './styles'
import logoImg from '../../assets/logo.png'

const LogIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg}/>
      <Title>Log In</Title>
      <Input name="email" icon="mail" placeholder="email" />
      <Input name="password" icon="lock" placeholder="password"/>
      <Button onPress={() => { console.log()}}>Enter</Button>
    </Container>
  )
}

export default LogIn
