import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import TenderList from './TenderList';

// Mock the supabase client
jest.mock('../../supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [],
        error: null,
      })),
    })),
  },
}));

describe('TenderList', () => {
  it('renders without errors', async () => {
    render(<TenderList />);
    // Use a wait function to wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByLabelText('Enter Tender name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
    });
  });

  it('displays tenders', async () => {
    // Mock tenders data
    const mockTenders = [
      {
        id: 1,
        title: 'Tender 1',
        description: 'Description 1',
        submission_deadline: '2024-06-01',
        document_url: 'http://example.com/document1.pdf',
      },
      {
        id: 2,
        title: 'Tender 2',
        description: 'Description 2',
        submission_deadline: '2024-06-15',
        document_url: 'http://example.com/document2.pdf',
      },
    ];

    // Update the mock implementation of supabase.from().select() to return mockTenders
    require('../../supabaseClient').supabase.from().select.mockImplementation(() => ({
      data: mockTenders,
      error: null,
    }));

    render(<TenderList />);

    // Wait for tenders to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Title: Tender 1')).toBeInTheDocument();
      expect(screen.getByText('Title: Tender 2')).toBeInTheDocument();
    });
  });

  it('handles search input correctly', async () => {
    render(<TenderList />);

    // Type 'Tender 1' into the search bar
    fireEvent.input(screen.getByLabelText('Enter Tender name'), { target: { value: 'Tender 1' } });

    // Check that the search query is updated
    expect(screen.getByLabelText('Enter Tender name')).toHaveValue('Tender 1');

    // Check that only 'Tender 1' is displayed
    await waitFor(() => {
      expect(screen.getByText('Title: Tender 1')).toBeInTheDocument();
      expect(screen.queryByText('Title: Tender 2')).not.toBeInTheDocument();
    });
  });

  // Add more tests as needed
});
