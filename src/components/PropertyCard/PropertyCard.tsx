import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
  Tooltip,
} from "@mui/material";
import { LocationOn, Edit as EditIcon } from "@mui/icons-material";
import { Property } from "@/types/property.types";
import { PropertyDetail } from "@/components/PropertyDetail/PropertyDetail";

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
}) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleViewDetails = () => {
    setDetailOpen(true);
    if (onSelect) {
      onSelect(property);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/properties/${property.id}/edit`);
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
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={property.images[0] || "/api/placeholder/400/200"}
            alt={property.title}
          />
          <Tooltip title="Edit property">
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
              onClick={handleEdit}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
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