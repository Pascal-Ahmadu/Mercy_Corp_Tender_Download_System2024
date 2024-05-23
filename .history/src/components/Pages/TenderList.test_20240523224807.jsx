import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TenderList from './TenderList';  // Adjust the import based on the actual path to your component

test('renders without errors', async () => {
  render(<TenderList />);
  
  await waitFor(() => {
    const inputElement = screen.queryByLabelText('Enter Tender name');
    const buttonElement = screen.queryByRole('button', { name: 'search' });
    
    expect(inputElement).not.toBeNull();
    expect(buttonElement).not.toBeNull();
  });
});

test('displays tenders', async () => {
  render(<TenderList />);

  await waitFor(() => {
    const tenderTitle = screen.queryByText(/Title: Tender Abuja/i);
    const tenderDescription = screen.queryByText(/MercyCorp, a leading global humanitarian organization, invites eligible suppliers to submit bids for the provision of emergency relief supplies./i);
    const tenderDeadlines = screen.queryAllByText(/Submission Deadline: 30\/06\/2024/i);

    expect(tenderTitle).not.toBeNull();
    expect(tenderDescription).not.toBeNull();
    expect(tenderDeadlines.length).toBeGreaterThan(0); // Assert that there is at least one element with the deadline text
  });
});
