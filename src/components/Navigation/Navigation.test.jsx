import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // For routing during testing
import Navigation from "./Navigation";

beforeEach(() => {
  sessionStorage.clear(); // Ensure sessionStorage is cleared before each test
});

describe("Navigation Component Tests", () => {
  // Test to ensure navigation works correctly to the confirmation page
  test("navigates to confirmation view when clicking 'Confirmation' link", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        {" "}
        {/* Set initial route to '/' */}
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route
            path="/confirmation"
            element={<div>Confirmation Page</div>}
          />{" "}
          {/* Define confirmation route */}
        </Routes>
      </MemoryRouter>
    );

    const confirmationLink = screen.getByText(/Confirmation/i); // Get the link text
    fireEvent.click(confirmationLink); // Simulate a click event on the confirmation link

    // Check if the route changes and the confirmation page is displayed
    expect(container.innerHTML).toContain("Confirmation Page");
  });

  // Test to ensure the 'No booking made' message appears when no booking is in sessionStorage
  test("shows 'No booking made' message if no booking is in session storage", () => {
    render(
      <MemoryRouter initialEntries={["/confirmation"]}>
        {" "}
        {/* Set initial route to '/confirmation' */}
        <Navigation />
      </MemoryRouter>
    );

    sessionStorage.removeItem("booking"); // Ensure no booking data is in sessionStorage
    window.location.pathname = "/confirmation"; // Simulate navigating to confirmation page

    // Check if the 'No booking made' message is displayed
    const noBookingMessage = screen.getByText(/Ingen bokning gjord/i);
    expect(noBookingMessage).toBeInTheDocument();
  });

  // Test to check if the booking from sessionStorage is displayed on the confirmation page
  test("shows booking details from session storage if a booking is made", () => {
    const bookingData = { name: "John Doe", room: "Deluxe" }; // Sample booking data
    sessionStorage.setItem("booking", JSON.stringify(bookingData)); // Store booking data in sessionStorage

    render(
      <MemoryRouter initialEntries={["/confirmation"]}>
        {" "}
        {/* Set initial route to '/confirmation' */}
        <Navigation />
      </MemoryRouter>
    );

    window.location.pathname = "/confirmation"; // Simulate navigating to confirmation page

    // Check if booking details are rendered on the page
    const bookingDetails = screen.getByText(/John Doe/i);
    expect(bookingDetails).toBeInTheDocument(); // Ensure booking name appears
  });
});
