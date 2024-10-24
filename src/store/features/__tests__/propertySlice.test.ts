import { describe, it, expect } from 'vitest';
import propertyReducer, {
  setSelectedProperty,
  setFilters,
  resetFilters,
} from '../propertySlice';
import { Property } from '@/types/property.types';

describe('propertySlice', () => {
  const initialState = {
    properties: [],
    selectedProperty: null,
    loading: false,
    error: null,
    filters: {
      status: [],
      priceRange: {
        min: 0,
        max: 1000000,
      },
      location: '',
    },
  };

  const mockProperty: Property = {
    id: '1',
    title: 'Test Property',
    description: 'Test Description',
    price: 200000,
    location: {
      address: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
    },
    features: ['feature1', 'feature2'],
    images: ['image1.jpg'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('should handle initial state', () => {
    expect(propertyReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSelectedProperty', () => {
    const actual = propertyReducer(initialState, setSelectedProperty(mockProperty));
    expect(actual.selectedProperty).toEqual(mockProperty);
  });

  it('should handle setFilters', () => {
    const newFilters = {
      status: ['available'],
      priceRange: {
        min: 100000,
        max: 500000,
      },
    };
    const actual = propertyReducer(initialState, setFilters(newFilters));
    expect(actual.filters).toEqual({
      ...initialState.filters,
      ...newFilters,
    });
  });

  it('should handle resetFilters', () => {
    const modifiedState = {
      ...initialState,
      filters: {
        status: ['available'],
        priceRange: {
          min: 100000,
          max: 500000,
        },
        location: 'Test City',
      },
    };
    const actual = propertyReducer(modifiedState, resetFilters());
    expect(actual.filters).toEqual(initialState.filters);
  });
});