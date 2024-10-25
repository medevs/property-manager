import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { Property } from '../../types/property.types';

type PropertyFormData = {
  title: string;
  description: string;
  price: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: string[];
  status: 'available' | 'rented' | 'maintenance';
};

const initialFormState: PropertyFormData = {
  title: '',
  description: '',
  price: '',
  location: {
    address: '',
    city: '',
    state: '',
    zipCode: '',
  },
  features: [],
  status: 'available',
};

interface PropertyFormProps {
  property?: Property;
  onSubmit: (property: Partial<Property>) => Promise<void>;
  isLoading?: boolean;
}

export default function PropertyForm({ property, onSubmit, isLoading = false }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>(() => {
    if (property) {
      return {
        ...property,
        price: property.price.toString(),
      };
    }
    return initialFormState;
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        price: property.price.toString(),
      });
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Pick<PropertyFormData, 'location'>],
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleStatusChange = (e: SelectChangeEvent<'available' | 'rented' | 'maintenance'>) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.value as 'available' | 'rented' | 'maintenance',
    }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const features = e.target.value.split(',').map(feature => feature.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      features,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Basic validation
      if (!formData.title || !formData.price || !formData.location.address) {
        throw new Error('Please fill in all required fields');
      }

      // Convert form data to Property type
      const propertyData: Partial<Property> = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await onSubmit(propertyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <Typography variant="h5" component="h2">
          {property ? 'Edit Property' : 'Create New Property'}
        </Typography>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="rented">Rented</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="State"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="location.zipCode"
                value={formData.location.zipCode}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Features (comma-separated)"
                name="features"
                value={formData.features.join(', ')}
                onChange={handleFeaturesChange}
                helperText="Enter features separated by commas"
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="flex justify-end gap-2">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : property ? 'Update Property' : 'Create Property'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
