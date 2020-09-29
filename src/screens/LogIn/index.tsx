import React, { useCallback, useRef } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  Icon,
} from './styles';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';

interface LoginFormData {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null)
  const navigation = useNavigation();

  const { logIn } = useAuth();

  const handleLogIn = useCallback(async (data: LoginFormData) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      email: Yup.string()
        .required('Email is mandatory.')
        .email('Invalid email.'),
      password: Yup.string().required('Password is mandatory.'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      await logIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
      }

      Alert.alert('Authentication error', 'Check your user and password.')
    }
  }, [logIn]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Log In</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleLogIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="email"
                returnKeyType="next"
                onSubmitEditing={() => { passwordInputRef.current?.focus() }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="password"
                returnKeyType="send"
                onSubmitEditing={() => { formRef.current?.submitForm() }}
              />
              <Button onPress={() => { formRef.current?.submitForm() }}>
                Enter
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default LogIn;
