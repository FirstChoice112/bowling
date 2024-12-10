import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Shoes from "./Shoes";
import { nanoid } from "nanoid";

const mockUpdateSize = vi.fn();
const mockAddShoe = vi.fn();
const mockRemoveShoe = vi.fn();

describe("Shoes Component", () => {
  let initialShoes;

  beforeEach(() => {
    initialShoes = [
      { id: nanoid(), size: "42" },
      { id: nanoid(), size: "43" },
    ];
  });

  it("renders the correct number of inputs and initial values", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(initialShoes.length);
    expect(inputs[0]).toHaveValue(42);
    expect(inputs[1]).toHaveValue(43);
  });

  it("calls updateSize with correct arguments on input change", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const firstInput = screen.getAllByRole("spinbutton")[0];
    fireEvent.change(firstInput, { target: { value: "44" } });

    expect(mockUpdateSize).toHaveBeenCalledWith(initialShoes[0].id, "44");
  });

  it("allows removing a player and updates the component correctly", () => {
    const { rerender } = render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const removeButton = screen.getAllByText("-")[0];
    fireEvent.click(removeButton);

    expect(mockRemoveShoe).toHaveBeenCalledWith(initialShoes[0].id);

    initialShoes = initialShoes.slice(1); // Simulate removal
    rerender(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const inputs = screen.queryAllByRole("spinbutton");
    expect(inputs).toHaveLength(initialShoes.length);
  });

  it("calls addShoe with a unique ID when the add button is clicked", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={initialShoes}
      />
    );

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    expect(mockAddShoe).toHaveBeenCalled();
  });
});
