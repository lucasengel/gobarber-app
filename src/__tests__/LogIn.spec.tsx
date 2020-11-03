import React from 'react';
import { render } from '@testing-library/react-native';
import LogIn from '../screens/LogIn';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {},
}));

describe('Login Screen', () => {
  it('should contain email and password inputs', () => {
    const { getByPlaceholderText } = render(<LogIn />);

    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
  });
});
