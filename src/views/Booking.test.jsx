import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "./Booking";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Validering av bokningsformulär", () => {
  it("Should not let user continue unless at least one player is entered", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/date/i), "2023-12-05");
    userEvent.type(screen.getByLabelText(/time/i), "15:00");
    userEvent.type(screen.getByLabelText(/number of lanes/i), "2");

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });
  });
});

describe("Bokningsprocess", () => {
  it("allows user to book a lane and receive confirmation", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/date/i), "2023-12-05");
    userEvent.type(screen.getByLabelText(/time/i), "15:00");
    userEvent.type(screen.getByLabelText(/number of awesome bowlers/i), "4");
    userEvent.type(screen.getByLabelText(/number of lanes/i), "2");

    await waitFor(() => {
      const confirmationMessage = screen.getByText(/strIIIIIike!/i);
      expect(confirmationMessage).toBeInTheDocument();
    });
  });
});

describe("Booking form interactions", () => {
  it("allows user to select a date and time", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: "2023-12-05" } });
    expect(dateInput.value).toBe("2023-12-05");

    const timeInput = screen.getByLabelText(/time/i);
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    expect(timeInput.value).toBe("15:00");
  });

  it("allows user to specify the number of players and lanes", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const playersInput = screen.getByLabelText(/number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: "4" } });
    expect(playersInput.value).toBe("4");

    const lanesInput = screen.getByLabelText(/number of lanes/i);
    fireEvent.change(lanesInput, { target: { value: "2" } });
    expect(lanesInput.value).toBe("2");
  });
});

describe("Validering av skostorlek", () => {
  it("should not require shoe sizes for all players", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/date/i), "2023-12-05");
    userEvent.type(screen.getByLabelText(/time/i), "15:00");
    userEvent.type(screen.getByLabelText(/number of awesome bowlers/i), "4");
    userEvent.type(screen.getByLabelText(/number of lanes/i), "2");

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    expect(
      screen.queryByText(/Antalet skor får inte överstiga antal spelare/i)
    ).toBeNull();
  });
});

describe("Bokning av flera banor", () => {
  it("should allow booking multiple lanes when the number of players exceeds the lane capacity", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/date/i), "2023-12-05");
    userEvent.type(screen.getByLabelText(/time/i), "15:00");
    userEvent.type(screen.getByLabelText(/number of awesome bowlers/i), "10");
    userEvent.type(screen.getByLabelText(/number of lanes/i), "2");

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    await waitFor(() => {
      const confirmationMessage = screen.getByText(/strIIIIIike!/i);
      expect(confirmationMessage).toBeInTheDocument();
    });

    await waitFor(() => {
      const lanesBooked = screen.getByText(/Bokade banor: 2 banor/i);
    });
  });
});
