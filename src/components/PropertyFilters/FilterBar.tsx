import React from 'react';
import { 
  Paper, 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Slider,
  Typography,
  Box,
  Chip,
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import { setFilters, resetFilters } from '@/store/features/propertySlice';

export const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.property.filters);

  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    dispatch(setFilters({ 
      status: typeof value === 'string' ? value.split(',') : value 
    }));
  };

  const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setFilters({ 
        priceRange: { min: newValue[0], max: newValue[1] } 
      }));
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ location: event.target.value }));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  const priceMarks = [
    { value: 0, label: '$0' },
    { value: 250000, label: '$250k' },
    { value: 500000, label: '$500k' },
    { value: 750000, label: '$750k' },
    { value: 1000000, label: '$1M' },
  ];

  return (
    <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
      <Grid container spacing={3} alignItems="center">
        {/* Search by Location */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search by location"
            variant="outlined"
            value={filters.location}
            onChange={handleLocationChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
        </Grid>

        {/* Property Status */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              multiple
              value={filters.status}
              onChange={handleStatusChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="rented">Rented</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Price Range */}
        <Grid item xs={12} md={4}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={[filters.priceRange.min, filters.priceRange.max]}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            marks={priceMarks}
            min={0}
            max={1000000}
            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
          />
        </Grid>

        {/* Clear Filters */}
        <Grid item xs={12} md={1}>
          <IconButton 
            onClick={handleClearFilters}
            aria-label="clear filters"
            sx={{ mt: 1 }}
          >
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};