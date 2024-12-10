import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Shoes from "./Shoes";
import { nanoid } from "nanoid";

const mockUpdateSize = vi.fn();
const mockAddShoe = vi.fn();
const mockRemoveShoe = vi.fn();

describe("Shoes Component", () => {
  const initialShoes = [
    { id: nanoid(), size: "42" },
    { id: nanoid(), size: "43" },
  ];

  it("should allow the user to enter a shoe size for each player", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const shoeInputs = screen.getAllByRole("spinbutton");

    expect(shoeInputs.length).toBe(initialShoes.length);
    expect(shoeInputs[0]).toHaveValue(42);
    expect(shoeInputs[1]).toHaveValue(43);
  });

  it("should allow the user to change the shoe size for a player", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const shoeInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(shoeInputs[0], { target: { value: "44" } });

    expect(mockUpdateSize).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "44",
          name: initialShoes[0].id,
        }),
      })
    );
  });

  it("should allow the user to choose a shoe size for all players", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const shoeInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(shoeInputs[0], { target: { value: "45" } });
    fireEvent.change(shoeInputs[1], { target: { value: "46" } });

    expect(mockUpdateSize).toHaveBeenCalledTimes(3);
    expect(mockUpdateSize).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "45",
          name: initialShoes[0].id,
        }),
      })
    );
    expect(mockUpdateSize).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "46",
          name: initialShoes[1].id,
        }),
      })
    );
  });
});
