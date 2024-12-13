import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";

beforeEach(() => {
  sessionStorage.clear();
});

describe("Navigation Component Tests", () => {
  test("navigates to confirmation view when clicking 'Confirmation' link", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/confirmation" element={<div>Confirmation Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const confirmationLink = screen.getByText(/Confirmation/i);
    fireEvent.click(confirmationLink);
    expect(container.innerHTML).toContain("Confirmation Page");
  });

  test("shows 'No booking made' message if no booking is in session storage", () => {
    render(
      <MemoryRouter initialEntries={["/confirmation"]}>
        <Navigation />
      </MemoryRouter>
    );

    sessionStorage.removeItem("booking");
    window.location.pathname = "/confirmation";
    const noBookingMessage = screen.getByText(/Ingen bokning gjord/i);
    expect(noBookingMessage).toBeInTheDocument();
  });

  test("shows booking details from session storage if a booking is made", () => {
    const bookingData = { name: "John Doe", room: "Deluxe" };
    sessionStorage.setItem("booking", JSON.stringify(bookingData));

    render(
      <MemoryRouter initialEntries={["/confirmation"]}>
        <Navigation />
      </MemoryRouter>
    );

    window.location.pathname = "/confirmation";

    const bookingDetails = screen.getByText(/John Doe/i);
    expect(bookingDetails).toBeInTheDocument();
  });
});
