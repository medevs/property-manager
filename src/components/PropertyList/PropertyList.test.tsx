import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '@/store/features/propertySlice';
import { PropertyList } from './PropertyList';
import { mockProperties } from '@/services/mockData';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      property: propertyReducer,
    },
    preloadedState: {
      property: {
        properties: [],
        selectedProperty: null,
        loading: false,
        error: null,
        filters: {
          status: [],
          priceRange: { min: 0, max: 1000000 },
          location: '',
        },
        ...initialState,
      },
    },
  });
};

describe('PropertyList', () => {
  it('shows loading state initially and then displays properties', async () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <PropertyList />
      </Provider>
    );

    // Should show loading first
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for properties to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('displays properties when data is loaded', async () => {
    const store = createMockStore({ properties: mockProperties });
    
    render(
      <Provider store={store}>
        <PropertyList />
      </Provider>
    );

    await waitFor(() => {
      mockProperties.forEach(property => {
        expect(screen.getByText(property.title)).toBeInTheDocument();
      });
    });
  });
});