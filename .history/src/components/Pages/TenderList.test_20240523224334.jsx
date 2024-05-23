import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TenderList from './TenderList'; // Adjust the import as per your file structure

test('renders without errors', async () => {
  render(<TenderList />);

  await waitFor(() => {
    expect(screen.getByLabelText('Enter Tender name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });
});

test('displays tenders', async () => {
  render(<TenderList />);

  await waitFor(() => {
    expect(screen.getByText(/Title: Tender Abuja/i)).toBeInTheDocument();
    expect(screen.getByText(/Title: Tender 2/i)).toBeInTheDocument(); // Adjust this based on actual title
  });
});

test('handles search input correctly', async () => {
  render(<TenderList />);

  // Simulate user actions if necessary, e.g., input text

  await waitFor(() => {
    expect(screen.getByLabelText('Enter Tender name').value).toBe('Tender 1');
    expect(screen.getByText(/Title: Tender 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Title: Tender 2/i)).not.toBeInTheDocument();
  });
});
