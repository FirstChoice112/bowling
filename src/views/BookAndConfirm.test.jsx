import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Confirmation from "./Confirmation";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { http } from "msw";

describe("Confirmation Component", () => {
  test("should display booking number and total price after completing the booking", async () => {
    const confirmationDetails = {
      when: "2024-12-13T18:00:00",
      people: 4,
      lanes: 2,
      id: "ABC123",
      price: 680,
    };

    sessionStorage.setItem("confirmation", JSON.stringify(confirmationDetails));

    render(
      <MemoryRouter initialEntries={["/confirmation"]}>
        <Routes>
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const bookingNumber = screen.getByLabelText(/Booking number/i).value;
      const total = screen.getByText(/Total:/i).nextSibling.textContent;

      console.log(`Booking Number: ${bookingNumber}`);
      console.log(`Total Price: ${total}`);
      console.log("Breakdown:");
      console.log(`  Players (4): 4 x 120 = 480 SEK`);
      console.log(`  Lanes (2): 2 x 100 = 200 SEK`);

      expect(bookingNumber).toBe("ABC123");
      expect(total).toBe("680 sek");
    });
  });

  test("should handle http request to /api/booking and display correct booking details", async () => {
    http.post("/api/booking", (req) => {
      const { people, lanes } = req.body;
      const total = people * 120 + lanes * 100;
      return {
        status: 201,
        body: { bookingId: "ABC123", total },
      };
    });

    const confirmationDetails = {
      when: "2024-12-13T18:00:00",
      people: 4,
      lanes: 2,
      id: "ABC123",
      price: 680,
    };

    sessionStorage.setItem("confirmation", JSON.stringify(confirmationDetails));

    render(
      <MemoryRouter initialEntries={["/confirmation"]}>
        <Routes>
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const bookingNumber = screen.getByLabelText(/Booking number/i).value;
      const total = screen.getByText(/Total:/i).nextSibling.textContent;

      console.log(`Booking Number: ${bookingNumber}`);
      console.log(`Total Price: ${total}`);
      console.log("Breakdown:");
      console.log(`  Players (4): 4 x 120 = 480 SEK`);
      console.log(`  Lanes (2): 2 x 100 = 200 SEK`);

      expect(bookingNumber).toBe("ABC123");
      expect(total).toBe("680 sek");
    });

    fireEvent.click(screen.getByText(/slutför bokning/i));

    await waitFor(() => {
      const bookingNumber = screen.getByLabelText(/Booking number/i).value;
      console.log(`Final Booking Number: ${bookingNumber}`);
      expect(bookingNumber).toBe("ABC123");
    });
  });
});
