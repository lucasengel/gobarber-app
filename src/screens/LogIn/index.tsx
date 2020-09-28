import React from 'react'
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText, Icon } from './styles'
import logoImg from '../../assets/logo.png'
import { ScrollView } from 'react-native-gesture-handler'

const LogIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled" >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Log In</Title>
            </View>
            <Input name="email" icon="mail" placeholder="email" />
            <Input name="password" icon="lock" placeholder="password" />
            <Button onPress={() => { console.log() }}>Enter</Button>
            <ForgotPassword>
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => { }} >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default LogIn
