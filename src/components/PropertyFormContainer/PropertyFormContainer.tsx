// src/components/PropertyFormContainer/PropertyFormContainer.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { createProperty, updateProperty } from '../../store/features/propertySlice';
import PropertyForm from '../PropertyForm/PropertyForm';
import type { Property } from '../../types/property.types';

export default function PropertyFormContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedProperty, loading, error } = useAppSelector((state) => state.property);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleSubmit = async (propertyData: Partial<Property>) => {
    try {
      if (selectedProperty?.id) {
        await dispatch(updateProperty({ 
          id: selectedProperty.id, 
          data: propertyData 
        })).unwrap();
      } else {
        await dispatch(createProperty(propertyData)).unwrap();
      }
      
      // Navigate back to property list on success
      navigate('/properties');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while saving the property';
      setErrorMessage(message);
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      <PropertyForm
        property={selectedProperty || undefined}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
      
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage || error || 'An error occurred while saving the property'}
        </Alert>
      </Snackbar>
    </>
  );
}