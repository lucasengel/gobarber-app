import React, { useRef, useCallback } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  BackToLoginButton,
  BackToLoginButtonText,
  Icon,
} from './styles';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is mandatory.'),
        email: Yup.string()
          .required('Email is mandatory.')
          .email('Invalid email.'),
        password: Yup.string().required('Password is mandatory.'),
      });

      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert('Successfully signed up', 'You can login.');

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        Alert.alert("Couldn't create user", 'Check fields for errors.');
      }
    },
    [navigation],
  );

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
              <Title>Sign Up</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="password"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                returnKeyType="send"
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Create account
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLoginButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#ffffff" />
        <BackToLoginButtonText>Back to log in</BackToLoginButtonText>
      </BackToLoginButton>
    </>
  );
};

export default SignUp;
