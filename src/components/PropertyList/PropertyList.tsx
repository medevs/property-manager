import React, { useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import { fetchProperties, setSelectedProperty } from '@/store/features/propertySlice';
import { Property } from '@/types/property.types';

export const PropertyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { properties, loading, error } = useAppSelector(state => state.property);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handlePropertySelect = (property: Property) => {
    dispatch(setSelectedProperty(property));
  };

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
        <Typography variant="h4" component="h1" gutterBottom>
          Available Properties
        </Typography>
        
        {properties.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No properties found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <PropertyCard 
                  property={property} 
                  onSelect={handlePropertySelect} 
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};