import PropTypes from "prop-types";

const FlightInfoBar = ({ searchParams }) => {
  return (
    <div className="flight-info-bar">
      <div className="info-group">
        <div>
          <span className="airport-code">{searchParams.origin}</span>
          <span className="city-name">{searchParams.cityFrom}</span>
        </div>
        <span className="divider">to</span>
        <div>
          <span className="airport-code">{searchParams.destination}</span>
          <span className="city-name">{searchParams.cityTo}</span>
        </div>
        <span className="divider">|</span>
        <div className="travel-date">
          <span>
            {new Date(searchParams?.date).toLocaleDateString("vi-VN")}
          </span>
        </div>
        {searchParams.returnDate && (
          <>
            <span className="divider">|</span>
            <div className="travel-date">
              <span>
                {new Date(searchParams.returnDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </>
        )}
        <span className="divider">|</span>
        <div className="passengers">
          <span>{searchParams.passengers} Passengers</span>
        </div>
      </div>
    </div>
  );
};

FlightInfoBar.propTypes = {
  searchParams: PropTypes.shape({
    origin: PropTypes.string,
    destination: PropTypes.string,
    date: PropTypes.string,
    cityFrom: PropTypes.string,
    cityTo: PropTypes.string,

    returnDate: PropTypes.string,
    passengers: PropTypes.number,
  }).isRequired,
};

export default FlightInfoBar;
