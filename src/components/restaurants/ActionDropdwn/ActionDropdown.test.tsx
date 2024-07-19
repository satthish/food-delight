import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this is correctly imported
import ActionsDropdown from '@/components/restaurants/ActionDropdwn/ActionDropdown';
import { useRouter } from 'next/router';
import { deleteRestaurant } from '@/lib/api';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/api', () => ({
  deleteRestaurant: jest.fn(),
}));

describe('ActionsDropdown', () => {
  const id = 1;
  const onDelete = jest.fn();
  const router = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(router);
  });

  it('renders menu options', () => {
    render(<ActionsDropdown id={id} onDelete={onDelete} />);

    const button = screen.getByLabelText('actions');
    fireEvent.click(button);

    expect(screen.getByText('Show Details')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('navigates to details page on "Show Details" click', () => {
    render(<ActionsDropdown id={id} onDelete={onDelete} />);

    const button = screen.getByLabelText('actions');
    fireEvent.click(button);

    const showDetailsOption = screen.getByText('Show Details');
    fireEvent.click(showDetailsOption);

    expect(router.push).toHaveBeenCalledWith(`/restaurant/${id}`);
  });

  it('deletes restaurant and shows success alert on "Delete" click', async () => {
    (deleteRestaurant as jest.Mock).mockResolvedValueOnce({});

    render(<ActionsDropdown id={id} onDelete={onDelete} />);

    const button = screen.getByLabelText('actions');
    fireEvent.click(button);

    const deleteOption = screen.getByText('Delete');
    fireEvent.click(deleteOption);

    await waitFor(() => expect(deleteRestaurant).toHaveBeenCalledWith(id));
    expect(onDelete).toHaveBeenCalledWith(id);
    expect(screen.getByText(`Successfully deleted restaurant with ID ${id}`)).toBeInTheDocument();
  });

  it('shows error alert if delete fails', async () => {
    (deleteRestaurant as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete'));

    render(<ActionsDropdown id={id} onDelete={onDelete} />);

    const button = screen.getByLabelText('actions');
    fireEvent.click(button);

    const deleteOption = screen.getByText('Delete');
    fireEvent.click(deleteOption);

    await waitFor(() => expect(deleteRestaurant).toHaveBeenCalledWith(id));
    expect(screen.getByText('Failed to delete restaurant')).toBeInTheDocument();
  });
});
