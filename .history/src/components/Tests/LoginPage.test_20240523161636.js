import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import '@testing-library/jest-dom/extend-expect';
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

  test('renders the login form', () => {
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('navigates to the admin home page after successful login', async () => {
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password'));
    expect(mockNavigate).toHaveBeenCalledWith('/admin/home?user=John%20Doe');
  });

  test('displays an error message on failed login', async () => {
    const errorMessage = 'Invalid email or password';
    mockLogin.mockRejectedValueOnce(new Error(errorMessage));

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
  });
});