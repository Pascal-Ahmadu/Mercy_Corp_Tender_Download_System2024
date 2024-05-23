import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RegistrationForm from './RegistrationForm';

test('renders RegistrationForm and handles form submission', async () => {
  await act(async () => {
    render(<RegistrationForm />);
  });

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const organisationInput = screen.getByLabelText(/organisation/i);
  const submitButton = screen.getByRole('button', { name: /register/i });

  await act(async () => {
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(organisationInput, { target: { value: 'Company Inc.' } });
  });

  await act(async () => {
    fireEvent.click(submitButton);
  });

  // Add assertions to check the form submission result, e.g.:
  // expect(someFunction).toHaveBeenCalledWith(expectedArguments);
});
