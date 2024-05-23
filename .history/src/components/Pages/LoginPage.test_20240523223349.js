import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from './LoginPage';

test('renders login page', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );

  // Use built-in matchers or testing library matchers
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeTruthy(); // Alternative to `toBeInTheDocument`
});
