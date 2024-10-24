import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyDetail } from './PropertyDetail';
import { Property } from '@/types/property.types';
import { vi } from 'vitest';

/**
 * Creates a mock property for testing
 * @author Ahmed Oublihi
 * @returns {Property} Mock property data
 */
const createMockProperty = (): Property => ({
  id: '1',
  title: 'Test Property',
  description: 'Test Description',
  price: 250000,
  location: {
    address: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zipCode: '12345'
  },
  features: ['Feature 1', 'Feature 2'],
  images: ['/test-image.jpg'],
  status: 'available',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
});

describe('PropertyDetail', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders property details correctly', () => {
    const mockProperty = createMockProperty();
    
    render(
      <PropertyDetail
        property={mockProperty}
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(mockProperty.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProperty.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockProperty = createMockProperty();
    
    render(
      <PropertyDetail
        property={mockProperty}
        open={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('shows correct status chip color', () => {
    const mockProperty = createMockProperty();
    mockProperty.status = 'rented';
    
    render(
      <PropertyDetail
        property={mockProperty}
        open={true}
        onClose={mockOnClose}
      />
    );

    const statusChip = screen.getByText('rented');
    expect(statusChip).toHaveClass('MuiChip-colorError');
  });
});