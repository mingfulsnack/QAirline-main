import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AddFlight.scss";
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
  const [loading, setLoading] = useState(false);

  // Store selected airport display values separately
  const [fromDisplayValue, setFromDisplayValue] = useState("");
  const [toDisplayValue, setToDisplayValue] = useState("");

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
        toast.error("Lỗi khi tải dữ liệu sân bay!");
      }
    };

    fetchCities();
  }, []);

  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setFromDisplayValue(value);

    // Clear the airport ID when user types manually
    setNewFlight({
      ...newFlight,
      origin_airport_id: "",
    });

    const filtered = cities.filter(
      (city) =>
        city.city.toLowerCase().includes(value.toLowerCase()) ||
        city.airportCode.toLowerCase().includes(value.toLowerCase()) ||
        city.airportName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFromCities(filtered);
    setShowFromDropdown(true);
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToDisplayValue(value);

    // Clear the airport ID when user types manually
    setNewFlight({
      ...newFlight,
      destination_airport_id: "",
    });

    const filtered = cities.filter(
      (city) =>
        city.city.toLowerCase().includes(value.toLowerCase()) ||
        city.airportCode.toLowerCase().includes(value.toLowerCase()) ||
        city.airportName.toLowerCase().includes(value.toLowerCase())
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
      setFromDisplayValue(
        `${airport.city} - ${airport.airportName} (${airport.airportCode})`
      );
      setShowFromDropdown(false);
    } else {
      setNewFlight({
        ...newFlight,
        destination_airport_id: airport.airportId,
      });
      setToDisplayValue(
        `${airport.city} - ${airport.airportName} (${airport.airportCode})`
      );
      setShowToDropdown(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".input-container")) {
        setShowFromDropdown(false);
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const {
      flight_number,
      origin_airport_id,
      destination_airport_id,
      scheduled_departure,
      scheduled_arrival,
      base_price,
      available_seats,
    } = newFlight;

    if (!flight_number.trim()) {
      toast.error("Vui lòng nhập số chuyến bay!");
      return false;
    }

    if (!origin_airport_id) {
      toast.error("Vui lòng chọn sân bay xuất phát!");
      return false;
    }

    if (!destination_airport_id) {
      toast.error("Vui lòng chọn sân bay đến!");
      return false;
    }

    if (origin_airport_id === destination_airport_id) {
      toast.error("Sân bay xuất phát và đích đến không thể giống nhau!");
      return false;
    }

    if (!scheduled_departure) {
      toast.error("Vui lòng chọn thời gian cất cánh!");
      return false;
    }

    if (!scheduled_arrival) {
      toast.error("Vui lòng chọn thời gian hạ cánh!");
      return false;
    }

    if (new Date(scheduled_departure) >= new Date(scheduled_arrival)) {
      toast.error("Thời gian hạ cánh phải sau thời gian cất cánh!");
      return false;
    }

    if (!base_price || parseFloat(base_price) <= 0) {
      toast.error("Vui lòng nhập giá vé hợp lệ!");
      return false;
    }

    if (!available_seats || parseInt(available_seats) <= 0) {
      toast.error("Vui lòng nhập số ghế khả dụng hợp lệ!");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setNewFlight({
      flight_number: "",
      origin_airport_id: "",
      destination_airport_id: "",
      scheduled_departure: "",
      scheduled_arrival: "",
      status: "scheduled",
      base_price: "",
      available_seats: "",
    });
    setFromDisplayValue("");
    setToDisplayValue("");
    setShowFromDropdown(false);
    setShowToDropdown(false);
  };

  const handleAddFlight = async () => {
    if (loading) return; // Prevent duplicate calls

    if (!validateForm()) return;

    setLoading(true);

    try {
      const flightData = {
        flight_number: newFlight.flight_number.trim(),
        origin_airport_id: newFlight.origin_airport_id,
        destination_airport_id: newFlight.destination_airport_id,
        scheduled_departure: newFlight.scheduled_departure,
        scheduled_arrival: newFlight.scheduled_arrival,
        status: newFlight.status,
        base_price: parseFloat(newFlight.base_price),
        available_seats: parseInt(newFlight.available_seats, 10),
      };

      const response = await axios.post("/admin/flights/", flightData);

      if (response) {
        onAddFlight(response);
        resetForm();
        toast.success("Thêm chuyến bay thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm chuyến bay:", error);

      // Handle specific error messages from server
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error("Số chuyến bay đã tồn tại!");
      } else {
        toast.error("Lỗi khi thêm chuyến bay!");
      }
    } finally {
      setLoading(false);
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
                value={fromDisplayValue}
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
                      key={city.airportId}
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
                value={toDisplayValue}
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
                      key={city.airportId}
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
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder="Số ghế khả dụng"
              value={newFlight.available_seats}
              onChange={(e) =>
                setNewFlight({ ...newFlight, available_seats: e.target.value })
              }
              min="1"
              step="1"
            />
          </div>
        </div>
        <button
          className="addButton"
          onClick={handleAddFlight}
          disabled={loading}
        >
          {loading ? "Đang thêm..." : "Thêm chuyến bay"}
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
