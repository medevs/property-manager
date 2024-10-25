import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { 
  createProperty, 
  updateProperty, 
  clearSelectedProperty,
  setSelectedProperty 
} from '../../store/features/propertySlice';
import PropertyForm from '../PropertyForm/PropertyForm';
import type { Property } from '../../types/property.types';

export default function PropertyFormContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { selectedProperty, loading, error, properties } = useAppSelector((state) => state.property);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // Effect to handle property selection based on route
  useEffect(() => {
    // If we're on the edit route, find and set the correct property
    if (id) {
      const propertyToEdit = properties.find(p => p.id === id);
      if (propertyToEdit) {
        dispatch(setSelectedProperty(propertyToEdit));
      } else {
        setErrorMessage('Property not found');
        setShowError(true);
        navigate('/properties');
      }
    } else {
      // If we're on the new property route, clear the selected property
      dispatch(clearSelectedProperty());
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedProperty());
    };
  }, [id, dispatch, properties, navigate]);

  const handleSubmit = async (propertyData: Partial<Property>) => {
    try {
      if (id) {
        await dispatch(updateProperty({ 
          id, 
          data: propertyData 
        })).unwrap();
      } else {
        await dispatch(createProperty(propertyData)).unwrap();
      }
      
      // Navigate back to property list on success
      dispatch(clearSelectedProperty());
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
