import { useMemo } from 'react';
// import { Property } from '@/types/property.types';
import { useAppSelector } from '@/hooks/store.hooks';

export const useFilteredProperties = () => {
  const { properties } = useAppSelector(state => state.property);
  const { status, priceRange, location } = useAppSelector(state => state.property.filters);

  return useMemo(() => {
    return properties.filter(property => {
      // Filter by status
      if (status.length > 0 && !status.includes(property.status)) {
        return false;
      }

      // Filter by price range
      if (property.price < priceRange.min || property.price > priceRange.max) {
        return false;
      }

      // Filter by location
      if (location && !property.location.city.toLowerCase().includes(location.toLowerCase()) &&
          !property.location.state.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [properties, status, priceRange, location]);
};