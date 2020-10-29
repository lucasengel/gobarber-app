import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  logIn(credential: LoginCredentials): Promise<void>;
  logOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStorageData = async (): Promise<void> => {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user'
      ]);

      if (token && user) {
        api.defaults.headers.common['authorization'] = `Bearer ${token}`;

        setData({ token: token, user: JSON.parse(user) })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const logIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.common['authorization'] = `Bearer ${token}`;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const logOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(async (user: User) => {
    setData({
      token: data.token,
      user
    })

    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
  },
    [setData, data.token],
  )

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        logIn,
        logOut,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider.');

  return context;
};
