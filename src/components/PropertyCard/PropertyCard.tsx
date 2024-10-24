import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { Property } from "@/types/property.types";
import { PropertyDetail } from "@/components/PropertyDetail/PropertyDetail";

/**
 * Props interface for PropertyCard component
 * @author Ahmed Oublihi
 * @interface PropertyCardProps
 */
interface PropertyCardProps {
  /** Property data to display in the card */
  property: Property;
  /** Optional callback when property is selected */
  onSelect?: (property: Property) => void;
}

/**
 * Displays a property in a card format with basic information
 * @author Ahmed Oublihi
 * @param {PropertyCardProps} props - Component props
 * @returns {JSX.Element} Rendered PropertyCard component
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
}) => {
  const [detailOpen, setDetailOpen] = useState(false);

  /**
   * Gets the appropriate Material UI color for the status chip
   * @author Ahmed Oublihi
   * @param {Property['status']} status - Property status
   * @returns {string} Material UI color value
   */
  const getStatusColor = (
    status: Property["status"]
  ): "success" | "error" | "warning" => {
    switch (status) {
      case "available":
        return "success";
      case "rented":
        return "error";
      case "maintenance":
        return "warning";
      default:
        return "success";
    }
  };

  /**
   * Handles the view details button click
   */
  const handleViewDetails = () => {
    setDetailOpen(true);
    if (onSelect) {
      onSelect(property);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={property.images[0] || "/api/placeholder/400/200"}
          alt={property.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              {property.title}
            </Typography>
            <Chip
              label={property.status}
              color={getStatusColor(property.status)}
              size="small"
              sx={{ ml: 1 }}
            />
          </Box>

          <Typography variant="h5" color="primary" gutterBottom>
            ${property.price.toLocaleString()}
          </Typography>

          <Stack spacing={1}>
            <Box display="flex" alignItems="center">
              <LocationOn color="action" sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {property.location.city}, {property.location.state}
              </Typography>
            </Box>
          </Stack>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={handleViewDetails} sx={{ ml: 1 }}>
            View Details
          </Button>
        </CardActions>
      </Card>

      <PropertyDetail
        property={property}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
};
