import React, { useRef } from 'react'
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Title, BackToLoginButton, BackToLoginButtonText, Icon } from './styles'
import logoImg from '../../assets/logo.png'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null)

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
              <Title>Sign Up</Title>
            </View>
            <Form ref={formRef} onSubmit={(data) => { console.log(data) }}>
              <Input name="name" icon="user" placeholder="name" />
              <Input name="email" icon="mail" placeholder="email" />
              <Input name="password" icon="lock" placeholder="password" />
              <Button onPress={() => { formRef.current?.submitForm() }}>Create account</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLoginButton onPress={() => navigation.goBack()} >
        <Icon name="arrow-left" size={20} color="#ffffff" />
        <BackToLoginButtonText>Back to log in</BackToLoginButtonText>
      </BackToLoginButton>
    </>
  )
}

export default SignUp
