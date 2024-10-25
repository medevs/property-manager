import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyForm from './PropertyForm';

describe('PropertyForm', () => {
  const mockOnSubmit = vi.fn();
  
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  const mockProperty = {
    id: '1',
    title: 'Test Property',
    description: 'Test Description',
    price: 150000,  // Changed from string to number
    location: {
      address: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
    },
    features: ['Feature 1', 'Feature 2'],
    status: 'available' as const,  // Added type assertion
    images: [] as string[],  // Added type assertion
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  };

  it('renders create form when no property is provided', () => {
    render(<PropertyForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText('Create New Property')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Create Property');
  });

  it('renders edit form when property is provided', () => {
    render(<PropertyForm property={mockProperty} onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText('Edit Property')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Update Property');

    // Check if form is populated with property data
    expect(screen.getByLabelText(/title/i)).toHaveValue(mockProperty.title);
    expect(screen.getByLabelText(/description/i)).toHaveValue(mockProperty.description);
    expect(screen.getByLabelText(/price/i)).toHaveValue(mockProperty.price.toString());
  });

  it('validates required fields before submission', async () => {
    render(<PropertyForm onSubmit={mockOnSubmit} />);
    
    // Try to submit empty form
    fireEvent.click(screen.getByRole('button', { name: /create property/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all required fields')).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('handles form submission with valid data', async () => {
    render(<PropertyForm onSubmit={mockOnSubmit} />);
    const user = userEvent.setup();

    // Fill in required fields
    await user.type(screen.getByLabelText(/title/i), 'New Property');
    await user.type(screen.getByLabelText(/price/i), '200000');
    await user.type(screen.getByLabelText(/address/i), '456 New St');
    await user.type(screen.getByLabelText(/city/i), 'New City');
    await user.type(screen.getByLabelText(/state/i), 'NS');
    await user.type(screen.getByLabelText(/zip code/i), '67890');

    // Submit form
    await user.click(screen.getByRole('button', { name: /create property/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    // Verify submitted data
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Property',
      price: 200000, // Changed to number
      location: expect.objectContaining({
        address: '456 New St',
        city: 'New City',
        state: 'NS',
        zipCode: '67890',
      }),
    }));
  });

  it('handles features input correctly', async () => {
    render(<PropertyForm onSubmit={mockOnSubmit} />);
    const user = userEvent.setup();

    const featuresInput = screen.getByLabelText(/features/i);
    await user.type(featuresInput, 'Pool, Garden, Garage');

    // Fill required fields
    await user.type(screen.getByLabelText(/title/i), 'Test');
    await user.type(screen.getByLabelText(/price/i), '100000');
    await user.type(screen.getByLabelText(/address/i), 'Test Address');
    await user.type(screen.getByLabelText(/city/i), 'Test City');
    await user.type(screen.getByLabelText(/state/i), 'TS');
    await user.type(screen.getByLabelText(/zip code/i), '12345');

    await user.click(screen.getByRole('button', { name: /create property/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          features: ['Pool', 'Garden', 'Garage'],
        })
      );
    });
  });

  it('shows loading state when isLoading prop is true', () => {
    render(<PropertyForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByRole('button')).toHaveTextContent('Saving...');
    expect(screen.getByRole('button')).toBeDisabled();
  });
});