import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import TenderList from './TendersList';

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
    act(() => {
      render(<TenderList />);
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Enter Tender name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
    });
  });

  it('displays tenders', async () => {
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

    require('../../supabaseClient').supabase.from().select.mockImplementation(() => ({
      data: mockTenders,
      error: null,
    }));

    act(() => {
      render(<TenderList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Title: Tender 1')).toBeInTheDocument();
      expect(screen.getByText('Title: Tender 2')).toBeInTheDocument();
    });
  });

  it('handles search input correctly', async () => {
    act(() => {
      render(<TenderList />);
    });

    fireEvent.input(screen.getByLabelText('Enter Tender name'), { target: { value: 'Tender 1' } });

    expect(screen.getByLabelText('Enter Tender name')).toHaveValue('Tender 1');

    await waitFor(() => {
      expect(screen.getByText('Title: Tender 1')).toBeInTheDocument();
      expect(screen.queryByText('Title: Tender 2')).not.toBeInTheDocument();
    });
  });

  // Add more tests as needed
});
