import React, { useCallback, useRef } from 'react'
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';


import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText, Icon } from './styles'
import logoImg from '../../assets/logo.png'

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data)
  }, [])

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

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="email" />
              <Input name="password" icon="lock" placeholder="password" />
              <Button onPress={() => { formRef.current?.submitForm() }}>Enter</Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')} >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default LogIn
