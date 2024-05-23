// src/components/pages/LoginPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from '../contexts/AuthContext'; // Correct import for AuthProvider
import LoginPage from './LoginPage'; // Correct import for LoginPage

describe('LoginPage', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );
  });

  it('renders the login form', () => {
    expect(screen.getByText('Login')).toBeInTheDocument(); // Update this to match your component's text
  });
});
