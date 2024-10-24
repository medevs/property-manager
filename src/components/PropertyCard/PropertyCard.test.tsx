import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyCard } from "./PropertyCard";
import { Property } from "@/types/property.types";
import { vi } from "vitest";

describe("PropertyCard", () => {
  const mockProperty: Property = {
    id: "1",
    title: "Test Property",
    description: "Test Description",
    price: 200000,
    location: {
      address: "123 Test St",
      city: "Test City",
      state: "TS",
      zipCode: "12345",
    },
    features: ["feature1", "feature2"],
    images: ["test-image.jpg"],
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders property information correctly", () => {
    render(<PropertyCard property={mockProperty} onSelect={mockOnSelect} />);

    expect(screen.getByText(mockProperty.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProperty.price.toLocaleString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockProperty.location.city}, ${mockProperty.location.state}`
      )
    ).toBeInTheDocument();
  });

  it("calls onSelect when view details button is clicked", () => {
    render(<PropertyCard property={mockProperty} onSelect={mockOnSelect} />);

    const viewDetailsButton = screen.getByText("View Details");
    fireEvent.click(viewDetailsButton);

    expect(mockOnSelect).toHaveBeenCalledWith(mockProperty);
  });
});
