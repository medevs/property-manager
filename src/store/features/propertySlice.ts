import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PropertyState } from '@/types/property.types';
import { propertyService } from '@/services/api';

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
      const data = await propertyService.getProperties();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch properties');
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setFilters: (state, action) => {
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