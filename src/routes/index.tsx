import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';

const Auth = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#312e38',
        },
      }}
    >
      <Auth.Screen name="LogIn" component={LogIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
