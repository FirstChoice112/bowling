import React from "react";
import "./Shoes.scss";
import { nanoid } from "nanoid";

import Input from "../Input/Input";

function Shoes({ updateSize, addShoe, removeShoe, shoes }) {
  const shoeComps = shoes.map((input, index) => {
    const label = `Shoe size / person ${index + 1}`;
    const shoeInput = (
      <article className="shoes__form" key={input.id}>
        <Input
          label={label}
          type="number"
          role="spinbutton"
          customClass="shoes__input"
          name={input.id}
          handleChange={updateSize}
          defaultValue={input.size}
          maxLength={2}
        />
        <button
          className="shoes__button shoes__button--small"
          onClick={() => {
            removeShoe(input.id);
          }}
        >
          -
        </button>
      </article>
    );

    return shoeInput;
  });

  return (
    <section className="shoes">
      <header>
        <h2 className="shoes__heading">Shoes</h2>
      </header>
      {shoeComps}
      <button
        className="shoes__button"
        onClick={() => {
          addShoe(nanoid());
        }}
      >
        +
      </button>
    </section>
  );
}

export default Shoes;
