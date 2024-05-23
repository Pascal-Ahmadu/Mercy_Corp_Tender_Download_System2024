import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import TenderList from './TenderList';
import { supabase } from '../../supabaseClient';

jest.mock('../../supabaseClient');

describe('TenderList', () => {
  beforeEach(() => {
    supabase.from.mockClear();
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        data: [],
        error: null,
      }),
    });
  });

  it('renders without errors', async () => {
    await act(async () => {
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

    supabase.from().select.mockResolvedValueOnce({
      data: mockTenders,
      error: null,
    });

    await act(async () => {
      render(<TenderList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Title: Tender 1')).toBeInTheDocument();
      expect(screen.getByText('Title: Tender 2')).toBeInTheDocument();
    });
  });

  it('handles search input correctly', async () => {
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

    supabase.from().select.mockResolvedValueOnce({
      data: mockTenders,
      error: null,
    });

    await act(async () => {
      render(<TenderList />);
    });

    fireEvent.input(screen.getByLabelText('Enter Tender name'), { target: { value: 'Tender 1' } });

    await waitFor(() => {
      expect(screen.getByLabelText('Enter Tender name')).toHaveValue('Tender 1');
      expect(screen.getByText('Title: Tender 1')).toBeInTheDocument();
      expect(screen.queryByText('Title: Tender 2')).not.toBeInTheDocument();
    });
  });

  // Add more tests as needed
});