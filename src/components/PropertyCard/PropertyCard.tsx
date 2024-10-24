import React from "react";
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

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
}) => {
  const { title, price, location, status, images } = property;

  const getStatusColor = (status: Property["status"]) => {
    switch (status) {
      case "available":
        return "success";
      case "rented":
        return "error";
      case "maintenance":
        return "warning";
      default:
        return "default";
    }
  };

  return (
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
        image={images[0] || "/api/placeholder/400/200"}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Chip
            label={status}
            color={getStatusColor(status)}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        <Typography variant="h5" color="primary" gutterBottom>
          ${price.toLocaleString()}
        </Typography>

        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <LocationOn color="action" sx={{ mr: 1 }} fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {location.city}, {location.state}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => onSelect(property)} sx={{ ml: 1 }}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};
