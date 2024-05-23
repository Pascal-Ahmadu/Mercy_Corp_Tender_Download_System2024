import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

test('validates form inputs', async () => {
  render(
    <MemoryRouter>
      <RegistrationForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });

 
});
