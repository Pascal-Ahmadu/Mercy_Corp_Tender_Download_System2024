import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TenderList from './TenderList'; // Adjust the import as per your file structure

test('renders without errors', async () => {
  render(<TenderList />);

  await waitFor(() => {
    expect(screen.getByLabelText('Enter Tender name')).not.toBeNull();
    expect(screen.getByRole('button', { name: 'search' })).not.toBeNull();
  });
});

test('displays tenders', async () => {
  render(<TenderList />);

  await waitFor(() => {
    expect(screen.getByText('Title: Tender 1')).not.toBeNull();
    expect(screen.getByText('Title: Tender 2')).not.toBeNull();
  });
});

test('handles search input correctly', async () => {
  render(<TenderList />);

  // Simulate user actions if necessary, e.g., input text

  await waitFor(() => {
    expect(screen.getByLabelText('Enter Tender name').value).toBe('Tender 1');
    expect(screen.getByText('Title: Tender 1')).not.toBeNull();
    expect(screen.queryByText('Title: Tender 2')).toBeNull();
  });
});
