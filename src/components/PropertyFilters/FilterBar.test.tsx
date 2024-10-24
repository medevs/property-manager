// src/components/PropertyFilters/FilterBar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '@/store/features/propertySlice';
import { FilterBar } from './FilterBar';
import { PropertyState } from '@/types/property.types';

const createMockStore = (initialState: Partial<PropertyState> = {}) => {
  const defaultState: PropertyState = {
    properties: [],
    selectedProperty: null,
    loading: false,
    error: null,
    filters: {
      status: [],
      priceRange: { min: 0, max: 1000000 },
      location: '',
    }
  };

  return configureStore({
    reducer: {
      property: propertyReducer
    },
    preloadedState: {
      property: {
        ...defaultState,
        ...initialState
      }
    }
  });
};

describe('FilterBar', () => {
  it('updates location filter on input change', async () => {
    const store = createMockStore();
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <FilterBar />
      </Provider>
    );

    const searchInput = screen.getByLabelText(/search by location/i);
    await user.type(searchInput, 'New York');

    expect(store.getState().property.filters.location).toBe('New York');
  });

  it('updates status filter when selecting status', async () => {
    const store = createMockStore();
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <FilterBar />
      </Provider>
    );

    const statusSelect = screen.getByLabelText(/status/i);
    await user.click(statusSelect);
    const availableOption = screen.getByText(/available/i);
    await user.click(availableOption);

    expect(store.getState().property.filters.status).toContain('available');
  });

  it('resets filters when clear button is clicked', async () => {
    const store = createMockStore({
      filters: {
        status: ['available'],
        priceRange: { min: 100000, max: 500000 },
        location: 'New York',
      }
    });
    
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <FilterBar />
      </Provider>
    );

    const clearButton = screen.getByLabelText(/clear filters/i);
    await user.click(clearButton);

    const state = store.getState().property.filters;
    expect(state.status).toHaveLength(0);
    expect(state.location).toBe('');
    expect(state.priceRange).toEqual({ min: 0, max: 1000000 });
  });
});