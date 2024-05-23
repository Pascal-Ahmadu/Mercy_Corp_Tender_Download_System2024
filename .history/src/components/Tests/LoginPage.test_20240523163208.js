import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import '@testing-library/jest-dom';
import LoginPage from '../pages/LoginPage';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the useAuth hook
const mockLogin = jest.fn();
const mockUser = { name: 'John Doe' };
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin, user: mockUser }),
}));

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Your test cases...
});