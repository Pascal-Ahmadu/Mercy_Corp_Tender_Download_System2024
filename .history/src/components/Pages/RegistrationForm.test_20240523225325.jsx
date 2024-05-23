import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  test('renders without errors', () => {
    render(<RegistrationForm />);
    // Add assertions as needed
  });

  test('validates form inputs', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Organisation'), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
      expect(screen.getByText('Password should be of minimum 8 characters length')).toBeInTheDocument();
      expect(screen.getByText('Passwords must match')).toBeInTheDocument();
      expect(screen.getByText('Organisation is required')).toBeInTheDocument();
    });
  });

  test('submits form with valid inputs', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Organisation'), { target: { value: 'Example Org' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Registration Successful')).toBeInTheDocument();
    });
  });

  // Add more tests for other scenarios as needed
});
