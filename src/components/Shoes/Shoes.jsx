import React from "react";
import "./Shoes.scss";
import { nanoid } from "nanoid";
import Input from "../Input/Input";

const Shoes = ({ updateSize, addShoe, removeShoe, shoes }) => {
  return (
    <section className="shoes">
      <header>
        <h2 className="shoes__heading">Shoes</h2>
      </header>
      {shoes.map((shoe, index) => (
        <article className="shoes__form" key={shoe.id}>
          <Input
            label={`Shoe size / person ${index + 1}`}
            type="number"
            role="spinbutton"
            customClass="shoes__input"
            name={shoe.id}
            handleChange={(e) => updateSize(shoe.id, e.target.value)}
            defaultValue={shoe.size}
            maxLength={2}
          />
          <button
            className="shoes__button shoes__button--small"
            onClick={() => removeShoe(shoe.id)}
            aria-label={`Remove player ${index + 1}`}
          >
            -
          </button>
        </article>
      ))}
      <button
        className="shoes__button"
        onClick={() => addShoe(nanoid())}
        aria-label="Add a new player"
      >
        +
      </button>
    </section>
  );
};

export default Shoes;
