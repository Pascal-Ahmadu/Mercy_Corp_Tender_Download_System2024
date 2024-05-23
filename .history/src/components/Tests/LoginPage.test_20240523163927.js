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
  
    test('renders login form', () => {
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Log in' });
  
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  
    test('calls login function with correct credentials', async () => {
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Log in' });
  
      fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('john.doe@example.com', 'password123');
        expect(mockNavigate).toHaveBeenCalledWith('/admin-dashboard/home');
      });
    });
  
    test('displays error message for incorrect credentials', async () => {
      mockLogin.mockRejectedValueOnce(new Error('Incorrect email or password'));
  
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Log in' });
  
      fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        const errorText = screen.getByText('Incorrect email or password');
        expect(errorText).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });
  