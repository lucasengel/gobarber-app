import React, { useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import { useAuth } from '../../hooks/auth'
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
  LogOutButton,
  LogOutButtonText
} from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input';

interface ProfileFormData {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const { user, updateUser, logOut } = useAuth();
  const { goBack } = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const navigateBack = useCallback(
    () => goBack(),
    [goBack],
  );

  const handleLogOut = () => {
    logOut()
  };

  const handleUpdateProfile = useCallback(
    async (data: ProfileFormData) => {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is mandatory.'),
        email: Yup.string()
          .required('Email is mandatory.')
          .email('Invalid email.'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('New password required')
            .min(6, 'Must be at least 6 characters long.'),
          otherwise: Yup.string().notRequired()
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string()
            .oneOf([Yup.ref('password')], 'Password must match')
            .min(6, 'Must be at least 6 characters long.'),
          otherwise: Yup.string().notRequired()
        }),
      });

      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password, old_password, password_confirmation } = data

        const formData = {
          name,
          email,
          ...(old_password ?
            {
              old_password,
              password,
              password_confirmation
            } : {}
          )
        }

        const response = await api.put('/profile', formData);

        updateUser(response.data)

        Alert.alert('Successfully update profile');

        goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        Alert.alert("Couldn't update profile", 'Check fields for errors.');
      }
    },
    [goBack, updateUser],
  );

  const handleUpdateAvatar = useCallback(
    () => {
      ImagePicker.showImagePicker({}, response => {
        if (response.didCancel) {
          return
        }

        if (response.error) {
          Alert.alert('Error updating image', 'Make sure the file is less than 500kb.')
          return
        }

        const formData = new FormData();

        formData.append('avatar', {
          uri: response.uri,
          type: 'image/jpeg',
          name: `${user.id}.jpg`
        })

        api.patch('/users/avatar', formData).then(({ data }) => {
          updateUser(data)
        })
      })
    },
    [updateUser, user.id],
  )

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
            <BackButton onPress={navigateBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>My profile</Title>
            </View>

            <Form ref={formRef} onSubmit={handleUpdateProfile} initialData={user}>
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
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="old_password"
                icon="lock"
                placeholder="current password"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  newPasswordInputRef.current?.focus();
                }}
                returnKeyType="next"
              />

              <Input
                ref={newPasswordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="new password"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
                returnKeyType="next"
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password_confirmation"
                icon="lock"
                placeholder="confirm password"
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
                Save change
              </Button>
            </Form>
          </Container>
          <LogOutButton title="logout" onPress={handleLogOut}>log out
          </LogOutButton>
        </ScrollView>
      </KeyboardAvoidingView>

    </>
  );
};

export default Profile
