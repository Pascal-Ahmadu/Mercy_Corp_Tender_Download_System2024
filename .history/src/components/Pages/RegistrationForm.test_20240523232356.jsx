// RegistrationForm.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from './RegistrationForm'; // Adjust the path if necessary

test('validates form inputs', () => {
  // Step 1: Render the component
  const { container } = render(<RegistrationForm />);
  
  // Output the rendered HTML for debugging purposes
  console.log(container.innerHTML);

  // Step 2: Check for presence of input fields
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).not.toBeNull();
  expect(emailInput).not.toBeNull();

  // Step 3: Simulate user input
  fireEvent.change(nameInput, { target: { value: '' } }); // Invalid name (empty)
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } }); // Invalid email format
  
  // Step 4: Optionally, you can check form submission or validation messages
  // For example, you might want to click a submit button and check for validation errors
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  // Check if validation messages are displayed (assuming your form shows errors)
  const nameError = screen.queryByText(/name is required/i);
  const emailError = screen.queryByText(/invalid email address/i);

  expect(nameError).not.toBeNull();
  expect(emailError).not.toBeNull();
});
