import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./FlightInfo.scss";
import axios from "../../Apis/axios";
import { toast } from "react-toastify";

function AddFlight({ onAddFlight }) {
  const [newFlight, setNewFlight] = useState({
    flight_number: "",
    origin_airport_id: "",
    destination_airport_id: "",
    scheduled_departure: "",
    scheduled_arrival: "",
    status: "scheduled",
    base_price: "",
    available_seats: "",
  });

  const [cities, setCities] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [filteredFromCities, setFilteredFromCities] = useState([]);
  const [filteredToCities, setFilteredToCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/flights/airports");
        const formattedData = response.map((airport) => ({
          city: airport.city,
          airportCode: airport.airport_code,
          airportName: airport.airport_name,
          airportId: airport._id,
        }));
        setCities(formattedData);
      } catch (error) {
        console.error("Error fetching airport data:", error);
      }
    };

    fetchCities();
  }, []);

  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setNewFlight({
      ...newFlight,
      origin_airport_id: value,
    });

    const filtered = cities.filter(
      (city) =>
        city.city.toLowerCase().includes(value.toLowerCase()) ||
        city.airportCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFromCities(filtered);
    setShowFromDropdown(true);
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setNewFlight({
      ...newFlight,
      destination_airport_id: value,
    });

    const filtered = cities.filter(
      (city) =>
        city.city.toLowerCase().includes(value.toLowerCase()) ||
        city.airportCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredToCities(filtered);
    setShowToDropdown(true);
  };

  const handleCitySelect = (type, airport) => {
    if (type === "from") {
      setNewFlight({
        ...newFlight,
        origin_airport_id: airport.airportId,
      });
      setShowFromDropdown(false);
    } else {
      setNewFlight({
        ...newFlight,
        destination_airport_id: airport.airportId,
      });
      setShowToDropdown(false);
    }
  };

  const handleAddFlight = async () => {
    if (
      newFlight.flight_number &&
      newFlight.origin_airport_id &&
      newFlight.destination_airport_id &&
      newFlight.scheduled_departure &&
      newFlight.scheduled_arrival &&
      newFlight.base_price &&
      newFlight.available_seats
    ) {
      try {
        const response = await axios.post("/admin/flights/", {
          flight_number: newFlight.flight_number,
          origin_airport_id: newFlight.origin_airport_id,
          destination_airport_id: newFlight.destination_airport_id,
          scheduled_departure: newFlight.scheduled_departure,
          scheduled_arrival: newFlight.scheduled_arrival,
          status: newFlight.status,
          base_price: parseFloat(newFlight.base_price),
          available_seats: parseInt(newFlight.available_seats, 10),
        });
        console.log("response", response);
        if (response) {
          onAddFlight(response);
          setNewFlight({
            flight_number: "",
            origin_airport_id: "",
            destination_airport_id: "",
            scheduled_departure: "",
            scheduled_arrival: "",
            status: "SCHEDULED",
            base_price: "",
            available_seats: "",
          });
          toast.success("Thêm chuyến bay thành công!");
        }
      } catch (error) {
        console.error("Lỗi khi thêm chuyến bay:", error);
        toast.error("Lỗi khi thêm chuyến bay!");
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <div className="addFlightForm">
      <div className="addContent">
        <h3>Thêm Chuyến Bay</h3>
        <div className="form-columns">
          <div className="column">
            <div className="input-container">
              <input
                type="text"
                placeholder="Số chuyến bay"
                value={newFlight.flight_number}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, flight_number: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Xuất phát từ"
                value={newFlight.origin_airport_id}
                onChange={handleFromInputChange}
                onFocus={() => {
                  setShowFromDropdown(true);
                  setFilteredFromCities(cities);
                }}
                autoComplete="off"
              />
              {showFromDropdown && (
                <div className="dropdown">
                  {filteredFromCities.map((city) => (
                    <div
                      key={city.airportCode}
                      className="dropdown-item"
                      onClick={() => handleCitySelect("from", city)}
                    >
                      <strong>{city.city}</strong> - {city.airportName}
                      <div className="airport-code">{city.airportCode}</div>
                    </div>
                  ))}
                  {filteredFromCities.length === 0 && (
                    <div className="dropdown-item">
                      Không có kết quả phù hợp
                    </div>
                  )}
                </div>
              )}
            </div>

            <input
              type="datetime-local"
              placeholder="Thời gian cất cánh dự kiến"
              value={newFlight.scheduled_departure}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  scheduled_departure: e.target.value,
                })
              }
            />
            <input
              type="datetime-local"
              placeholder="Thời gian hạ cánh dự kiến"
              value={newFlight.scheduled_arrival}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  scheduled_arrival: e.target.value,
                })
              }
            />
          </div>
          <div className="column">
            <div className="input-container">
              <input
                type="text"
                placeholder="Điểm đến"
                value={newFlight.destination_airport_id}
                onChange={handleToInputChange}
                onFocus={() => {
                  setShowToDropdown(true);
                  setFilteredToCities(cities);
                }}
                autoComplete="off"
              />
              {showToDropdown && (
                <div className="dropdown">
                  {filteredToCities.map((city) => (
                    <div
                      key={city.airportCode}
                      className="dropdown-item"
                      onClick={() => handleCitySelect("to", city)}
                    >
                      <strong>{city.city}</strong> - {city.airportName}
                      <div className="airport-code">{city.airportCode}</div>
                    </div>
                  ))}
                  {filteredToCities.length === 0 && (
                    <div className="dropdown-item">
                      Không có kết quả phù hợp
                    </div>
                  )}
                </div>
              )}
            </div>

            <input
              type="number"
              placeholder="Giá vé"
              value={newFlight.base_price}
              onChange={(e) =>
                setNewFlight({ ...newFlight, base_price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Số ghế khả dụng"
              value={newFlight.available_seats}
              onChange={(e) =>
                setNewFlight({ ...newFlight, available_seats: e.target.value })
              }
            />
          </div>
        </div>
        <button className="addButton" onClick={handleAddFlight}>
          Thêm chuyến bay
        </button>
        {/* <button className="cancelButton">Huỷ</button> */}
      </div>
    </div>
  );
}

AddFlight.propTypes = {
  onAddFlight: PropTypes.func.isRequired,
};

export default AddFlight;
