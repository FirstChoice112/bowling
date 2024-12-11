import React, { useState, useEffect } from "react";
import "./Navigation.scss";
import navicon from "../../assets/navicon.svg";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const storedBooking = sessionStorage.getItem("booking");
    if (storedBooking) {
      setBooking(JSON.parse(storedBooking));
    }
  }, []);

  return (
    <nav className={`navigation ${showMenu ? "show-menu" : ""}`}>
      <img
        src={navicon}
        className="navigation__icon"
        onClick={() => setShowMenu(!showMenu)}
        alt="Menu icon"
      />
      <a
        href="#"
        className={`navigation__link ${showMenu ? "" : "hide"}`}
        onClick={() => navigate("/")}
      >
        Booking
      </a>
      <a
        href="#"
        className={`navigation__link ${showMenu ? "" : "hide"}`}
        onClick={() => navigate("/confirmation")}
      >
        Confirmation
      </a>

      {/* Show booking details if booking exists in sessionStorage */}
      {booking ? (
        <div className="booking-details">
          <p>Booking for: {booking.name}</p>
          <p>Room type: {booking.room}</p>
        </div>
      ) : (
        <p className="no-booking">Ingen bokning gjord</p>
      )}
    </nav>
  );
}

export default Navigation;
