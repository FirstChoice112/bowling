import React from "react";
import "./Confirmation.scss";
import { useLocation } from "react-router-dom";

import Top from "../components/Top/Top";
import Navigation from "../components/Navigation/Navigation";

function Confirmation() {
  const { state } = useLocation();

  const confirmation =
    state?.confirmationDetails ||
    JSON.parse(sessionStorage.getItem("confirmation"));

  return (
    <section className="confirmation">
      <Navigation />
      <Top title="See you soon!" />
      {state || confirmation ? (
        <div className="confirmation__details">
          <div className="confirmation__input-group">
            <label htmlFor="when" className="confirmation__label">
              When
            </label>
            <input
              id="when"
              type="text"
              className="confirmation__input"
              value={confirmation.when.replace("T", " ")}
              disabled
            />
          </div>
          <div className="confirmation__input-group">
            <label htmlFor="who" className="confirmation__label">
              Who
            </label>
            <input
              id="who"
              type="text"
              className="confirmation__input"
              value={confirmation.people}
              disabled
            />
          </div>
          <div className="confirmation__input-group">
            <label htmlFor="lanes" className="confirmation__label">
              Lanes
            </label>
            <input
              id="lanes"
              type="text"
              className="confirmation__input"
              value={confirmation.lanes}
              disabled
            />
          </div>
          <div className="confirmation__input-group">
            <label htmlFor="bookingNumber" className="confirmation__label">
              Booking number
            </label>
            <input
              id="bookingNumber"
              type="text"
              className="confirmation__input"
              value={confirmation.id}
              disabled
            />
          </div>
          <div className="confirmation__price">
            <p>Total:</p>
            <p>{confirmation.price} sek</p>
          </div>
          <button className="button confirmation__button">
            Sweet, let's go!
          </button>
        </div>
      ) : (
        <h2 className="confirmation__no-booking">Inga bokning gjord!</h2>
      )}
    </section>
  );
}

export default Confirmation;
