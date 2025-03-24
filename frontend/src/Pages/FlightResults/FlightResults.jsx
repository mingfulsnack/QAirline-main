import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import FlightCardV2 from "./FlightCardV2";
import FlightInfoBar from "./FlightInfoBar";
import "./FlightResults.scss";

import { smoothScrollTo } from "../../CommonFunctions/SmoothScroll";
import { smoothScrollToTop } from "../../CommonFunctions/SmoothScrollToTop";

const FlightResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchResults, searchParams } = location.state || {};
  console.log("searchResults", searchResults);
  console.log("searchParams", searchParams);
  // State để lưu chuyến bay được chọn
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const refReturn = useRef(null);

  const handleScrollToReturnFlight = () => {
    if (refReturn.current) {
      smoothScrollTo(refReturn);
    }
  };

  const scrollToTop = () => {
    setTimeout(() => {
      smoothScrollToTop();
    }, 100); // Đặt thời gian trì hoãn (500ms)
  };

  if (!searchResults) {
    return (
      <div className="no-results">
        <h2>Không tìm thấy kết quả</h2>
        <Link to="/" className="back-button">
          Quay lại trang tìm kiếm
        </Link>
      </div>
    );
  }

  const handleFlightSelection = (flight, type) => {
    if (type === "outbound") {
      setSelectedOutbound(flight);
    } else {
      setSelectedReturn(flight);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedOutbound) {
      alert("Vui lòng chọn chuyến bay đi");
      return;
    }
    if (searchParams.isRoundTrip && !selectedReturn) {
      alert("Vui lòng chọn chuyến bay về");
      return;
    }
    // Xử lý logic xác nhận đặt vé ở đây
    navigate("/BookingUserInfo", {
      state: {
        outbound: selectedOutbound,
        return: selectedReturn,
        totalAmount:
          ((selectedOutbound?.price || 0) + (selectedReturn?.price || 0)) *
          parseInt(searchParams.passengers),
        passengers: searchParams.passengers,
      },
    });
    console.log("Confirmed booking:", {
      outbound: selectedOutbound,
      return: selectedReturn,
      passengers: searchParams.passengers,
    });
  };

  return (
    <div className="flight-results">
      <FlightInfoBar searchParams={searchParams} />

      {/* Chuyến bay đi */}
      <div className="flight-section">
        <h2 className="section-title">Chuyến bay đi - {searchParams.date}</h2>

        <div className="flights-list">
          {searchResults.outbound &&
            searchResults.outbound.map((flight, index) => (
              <div key={index}>
                <FlightCardV2
                  handleClickSelected={() => handleScrollToReturnFlight()}
                  flight={flight}
                  isSelected={selectedOutbound?.id === flight.id}
                  onSelect={(selectedFlight) =>
                    handleFlightSelection(selectedFlight, "outbound")
                  }
                />
              </div>
            ))}
        </div>
      </div>

      {/* Chuyến bay về (chỉ hiển thị nếu là vé khứ hồi) */}
      {searchParams.isRoundTrip && (
        <div className="flight-section">
          <h2 ref={refReturn} className="section-title">
            Chuyến bay về - {searchParams.returnDate}
          </h2>
          <div className="flights-list">
            {searchResults.outbound &&
              searchResults.outbound.map((flight, index) => (
                <div key={index}>
                  <FlightCardV2
                    flight={flight}
                    onSelect={(selectedFlight) =>
                      handleFlightSelection(selectedFlight, "return")
                    }
                    isSelected={selectedOutbound?.id === flight.id}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Nút xác nhận */}
      <div className="booking-confirmation">
        <div className="selected-flights-summary">
          <div className="selected-flight">
            <strong>Chuyến đi:</strong>
            {selectedOutbound
              ? `${selectedOutbound?.price.toLocaleString()}đ`
              : "Chưa chọn"}
          </div>
          {searchParams.isRoundTrip && (
            <div className="selected-flight">
              <strong>Chuyến về:</strong>
              {selectedReturn
                ? `${selectedReturn?.price.toLocaleString()}đ`
                : "Chưa chọn"}
            </div>
          )}
          <div className="total-price">
            <strong>Tổng tiền:</strong>
            {(
              ((selectedOutbound?.price || 0) + (selectedReturn?.price || 0)) *
              parseInt(searchParams.passengers)
            ).toLocaleString()}
            đ
          </div>
        </div>
        <button
          className="confirm-button"
          onClick={() => {
            handleConfirmBooking();
            scrollToTop();
          }}
          disabled={
            !selectedOutbound || (searchParams.isRoundTrip && !selectedReturn)
          }
        >
          Xác nhận đặt vé
        </button>
      </div>
    </div>
  );
};

export default FlightResults;
