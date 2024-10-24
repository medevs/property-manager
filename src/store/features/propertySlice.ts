import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PropertyState, Property } from '@/types/property.types';

const initialState: PropertyState = {
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

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      // TODO This will be replaced with actual API call later
      const response = await fetch('/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      return data as Property[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch properties');
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<PropertyState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedProperty, setFilters, resetFilters } = propertySlice.actions;
export default propertySlice.reducer;