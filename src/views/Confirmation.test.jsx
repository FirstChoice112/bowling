import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "./Confirmation";

describe("Confirmation Component", () => {
  const mockConfirmationDetails = {
    when: "2024-12-11T18:00",
    people: "4",
    lanes: "2",
    id: "ABC123",
    price: "680",
  };

  beforeEach(() => {
    sessionStorage.setItem(
      "confirmation",
      JSON.stringify(mockConfirmationDetails)
    );
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  test("should display booking number", () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Booking number")).toHaveValue("ABC123");
  });

  test("should display total price", () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("680 sek")).toBeInTheDocument();
  });

  test("should calculate total price correctly", () => {
    const totalPrice = 4 * 120 + 2 * 100; // 4 personer, 2 banor
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText(`${totalPrice} sek`)).toBeInTheDocument();
  });

  test("should show Sweet, let's go! button", () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "Sweet, let's go!" });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test("should display error message if no booking exists", () => {
    sessionStorage.clear(); // Simulera ingen bokning
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument();
  });
});
