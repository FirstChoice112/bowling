import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.scss";
import BookingInfo from "../components/BookingInfo/BookingInfo";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Navigation from "../components/Navigation/Navigation";
import Shoes from "../components/Shoes/Shoes";
import Top from "../components/Top/Top";

function Booking() {
  const [booking, setBooking] = useState({
    when: "",
    time: "",
    lanes: 0,
    people: 0,
  });
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function updateBookingDetails(event) {
    const { name, value } = event.target;
    setError("");

    setBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function updateSize(event) {
    const { value, name } = event.target;
    setError("");

    if (value.length === 2 || value.length === 0) {
      setShoes((prevState) =>
        prevState.map((shoe) =>
          shoe.id === name ? { ...shoe, size: value } : shoe
        )
      );
    }
  }

  function addShoe(name) {
    setError("");
    setShoes([...shoes, { id: name, size: "" }]);
  }

  function removeShoe(name) {
    setError("");
    setShoes(shoes.filter((shoe) => shoe.id !== name));
  }

  function isShoeSizesFilled() {
    return shoes.every((shoe) => shoe.size.length > 0);
  }

  function checkRequiredLanes() {
    const MAX_PLAYERS_PER_LANE = 4;
    return Math.ceil(booking.people / MAX_PLAYERS_PER_LANE);
  }

  async function sendBooking(bookingInfo) {
    const response = await fetch(
      "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
      {
        method: "POST",
        headers: {
          "x-api-key": "738c6b9d-24cf-47c3-b688-f4f4c5747662",
        },
        body: JSON.stringify(bookingInfo),
      }
    );
    const data = await response.json();
    return data;
  }

  function comparePeopleAndShoes() {
    return shoes.length <= parseInt(booking.people) || shoes.length === 0;
  }

  function saveConfirmation(confirmation) {
    return new Promise((resolve) => {
      sessionStorage.setItem("confirmation", JSON.stringify(confirmation));
      resolve();
    });
  }

  async function book() {
    let errorMessage = "";

    if (!booking.when || !booking.lanes || !booking.time || !booking.people) {
      errorMessage = "Alla fälten måste vara ifyllda";
    } else if (!comparePeopleAndShoes()) {
      errorMessage =
        "Antalet skor får inte överstiga antal spelare, men det är valfritt.";
    } else {
      const requiredLanes = checkRequiredLanes();
      if (booking.lanes < requiredLanes) {
        errorMessage = `För att rymma ${booking.people} spelare, behöver du boka åtminstone ${requiredLanes} banor.`;
      }
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const bookingInfo = {
      when: `${booking.when}T${booking.time}`,
      lanes: booking.lanes,
      people: booking.people,
      shoes: shoes.map((shoe) => shoe.size),
    };

    const confirmation = await sendBooking(bookingInfo);
    await saveConfirmation(confirmation);

    navigate("/confirmation", {
      state: { confirmationDetails: confirmation },
    });
  }

  useEffect(() => {
    const requiredLanes = checkRequiredLanes();
    if (booking.lanes < requiredLanes) {
      setBooking((prevState) => ({
        ...prevState,
        lanes: requiredLanes,
      }));
    }
  }, [booking.people]);

  return (
    <section className="booking">
      <Navigation />
      <Top title="Booking" />
      <BookingInfo updateBookingDetails={updateBookingDetails} />
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
      <form>
        <section className="input">
          <label htmlFor="people" className="input__label">
            Number of awesome bowlers
          </label>
          <input
            className="input__field booking-info__who"
            maxLength="2"
            name="people"
            type="number"
            value={booking.people}
            onChange={updateBookingDetails}
            id="people"
          />
        </section>

        <section className="input">
          <label htmlFor="lanes" className="input__label">
            Number of lanes
          </label>
          <input
            className="input__field booking-info__lanes"
            maxLength="2"
            name="lanes"
            type="number"
            value={booking.lanes}
            onChange={updateBookingDetails}
            id="lanes"
          />
        </section>

        <section className="input">
          <label htmlFor="time" className="input__label">
            Time
          </label>
          <input
            className="input__field booking-info__time"
            name="time"
            type="time"
            value={booking.time}
            onChange={updateBookingDetails}
            id="time"
          />
        </section>

        <section className="input">
          <label htmlFor="date" className="input__label">
            Date
          </label>
          <input
            className="input__field booking-info__date"
            name="when"
            type="date"
            value={booking.when}
            onChange={updateBookingDetails}
            id="date"
          />
        </section>
      </form>

      <button className="button booking__button" onClick={book}>
        strIIIIIike!
      </button>

      {error && <ErrorMessage message={error} />}

      {booking.lanes > 0 && (
        <section className="confirmation">
          <p>Bokade banor: {booking.lanes} banor</p>
        </section>
      )}
    </section>
  );
}

export default Booking;
