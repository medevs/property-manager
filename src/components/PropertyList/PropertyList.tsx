import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Container,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { FilterBar } from '@/components/PropertyFilters/FilterBar';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import { fetchProperties, setSelectedProperty } from '@/store/features/propertySlice';
import { useFilteredProperties } from '@/hooks/useFilteredProperties';

export const PropertyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.property);
  const filteredProperties = useFilteredProperties();

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Available Properties
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/properties/new')}
          >
            Add Property
          </Button>
        </Box>

        <FilterBar />

        {filteredProperties.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No properties found matching your criteria.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <PropertyCard
                  property={property}
                  onSelect={(property) => dispatch(setSelectedProperty(property))}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};