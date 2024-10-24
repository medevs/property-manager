import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  LocationOn,
  Close as CloseIcon,
  CalendarToday,
  AttachMoney,
  Check,
  Clear,
} from "@mui/icons-material";
import { Property } from "@/types/property.types";

/**
 * Props interface for the PropertyFeature component
 * @author Ahmed Oublihi
 * @interface PropertyFeatureProps
 */
interface PropertyFeatureProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

/**
 * Displays a single property feature with an icon and value
 * @author Ahmed Oublihi
 * @param {PropertyFeatureProps} props - Component props
 * @returns {JSX.Element} Rendered PropertyFeature component
 */
const PropertyFeature: React.FC<PropertyFeatureProps> = ({
  icon,
  label,
  value,
}) => (
  <Box display="flex" alignItems="center" mb={2}>
    <Box mr={1} display="flex" alignItems="center" color="primary.main">
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Box>
);

/**
 * Props interface for the PropertyDetail component
 * @interface PropertyDetailProps
 */
interface PropertyDetailProps {
  property: Property | null;
  open: boolean;
  /** Callback function to handle dialog close */
  onClose: () => void;
}

/**
 * Displays detailed information about a property in a dialog
 * @author Ahmed Oublihi
 * @param {PropertyDetailProps} props - Component props
 * @returns {JSX.Element} Rendered PropertyDetail component
 */
export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  open,
  onClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!property) {
    return null;
  }

  /**
   * Formats a date string into a localized date display
   * @author Ahmed Oublihi
   * @param {string} dateString - ISO date string to format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Gets the appropriate color for the status chip
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h6">Property Details</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Main Image */}
          <Grid item xs={12}>
            <Box
              component="img"
              src={property.images[0] || "/api/placeholder/800/400"}
              alt={property.title}
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          </Grid>

          {/* Title and Status */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" component="h2">
                {property.title}
              </Typography>
              <Chip
                label={property.status}
                color={getStatusColor(property.status)}
                icon={property.status === "available" ? <Check /> : <Clear />}
              />
            </Box>
          </Grid>

          {/* Property Features */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ height: "100%" }}>
              <CardContent>
                <PropertyFeature
                  icon={<AttachMoney />}
                  label="Price"
                  value={`$${property.price.toLocaleString()}`}
                />
                <PropertyFeature
                  icon={<LocationOn />}
                  label="Location"
                  value={`${property.location.address}, ${property.location.city}, ${property.location.state} ${property.location.zipCode}`}
                />
                <PropertyFeature
                  icon={<CalendarToday />}
                  label="Listed Date"
                  value={formatDate(property.createdAt)}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Features and Amenities */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Features
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {property.features.map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" paragraph>
              {property.description}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          color={property.status === "available" ? "primary" : "error"}
          disabled={property.status !== "available"}
        >
          {property.status === "available" ? "Contact Agent" : "Not Available"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
