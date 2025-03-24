import PropTypes from "prop-types";
import { FaPlaneDeparture } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

function FlightCardV2({ flight, onSelect, isSelected, handleClickSelected }) {
  const {
    scheduled_departure,
    scheduled_arrival,
    base_price,

    flight_number,
  } = flight;
  const calculateDuration = (departure, arrival) => {
    const differenceMs = new Date(arrival) - new Date(departure);
    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours and ${minutes} minutes`;
  };

  const handleSelectClass = (fareType) => {
    onSelect({
      ...flight,
      fareType,
      price: fareType === "economy" ? base_price : base_price * 1.5,
    });
  };

  return (
    <div className={`flight-card2 ${isSelected ? "selected" : ""}`}>
      <div className="flight-info2">
        <div className="details2">
          <img src="./assets/Qlogo.png" alt="" className="logoCard" />
          <div className="text">
            <p>
              <strong className="name">{flight_number} - </strong>
              {calculateDuration(scheduled_departure, scheduled_arrival)} - Bay
              thẳng
            </p>
          </div>
        </div>

        <div className="timeline2">
          <h2 className="timeCard">
            {new Date(scheduled_departure).toLocaleTimeString()}
          </h2>
          <FaPlaneDeparture className="iconCard" />
          <div className="line">
            <div className="solid-line2"></div>
          </div>
          <HiOutlineLocationMarker className="iconCard" />
          <h2 className="timeCard">
            {new Date(scheduled_arrival).toLocaleTimeString()}
          </h2>
        </div>
      </div>
      <div className="flight-classes2">
        <div className="box-eco2">
          <h2>Economy</h2>
          <h4>{base_price?.toLocaleString("vi-VN")} VND</h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectClass("economy");
              handleClickSelected();
            }}
            className={
              isSelected && flight.fareType === "economy" ? "selected" : ""
            }
          >
            Chọn
          </button>
        </div>
        <div className="box-busi2">
          <h2>Business</h2>
          <h4>{(base_price * 1.5)?.toLocaleString("vi-VN")} VND</h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectClass("business");
              handleClickSelected();
            }}
            className={
              isSelected && flight.fareType === "business" ? "selected" : ""
            }
          >
            Chọn
          </button>
        </div>
      </div>
    </div>
  );
}

FlightCardV2.propTypes = {
  flight: PropTypes.shape({
    scheduled_departure: PropTypes.string,
    scheduled_arrival: PropTypes.string,
    base_price: PropTypes.number,
    origin_airport_id: PropTypes.shape({
      airport_name: PropTypes.string,
    }).isRequired,
    destination: PropTypes.string,
    airline: PropTypes.string,
    flight_number: PropTypes.string,
    aircraft: PropTypes.string,
    availableSeats: PropTypes.number,
    fareType: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  handleClickSelected: PropTypes.func.isRequired,
};

export default FlightCardV2;
