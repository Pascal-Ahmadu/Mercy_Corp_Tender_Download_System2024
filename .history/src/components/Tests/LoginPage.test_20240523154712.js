import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LoginPage from '../LoginPage';

jest.mock('../contexts/AuthContext');

describe('LoginPage', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  const renderComponent = (user = null) => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin, user }}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
  });

  it('renders LoginPage and checks for UI elements', () => {
    renderComponent();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
  });

  it('handles email and password input', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('shows loading state when login is clicked', async () => {
    renderComponent();

    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByRole('progressbar')).toBeInTheDocument());
  });

  it('displays error message on login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));
    renderComponent();

    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    await waitFor(() => expect(screen.getByText(/login failed/i)).toBeInTheDocument());
  });

  it('navigates to /admin/home on successful login', async () => {
    const user = { name: 'John Doe' };
    mockLogin.mockResolvedValueOnce(user);

    renderComponent();

    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/admin/home?user=John%20Doe`));
  });
});
