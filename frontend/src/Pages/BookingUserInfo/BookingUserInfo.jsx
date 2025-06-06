// BookingUserInfo.jsx
import { useState, useEffect } from "react";
import "./BookingUserInfo.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Apis/axios";
import { ClipLoader } from "react-spinners";
import { smoothScrollToTop } from "../../CommonFunctions/SmoothScrollToTop";

export default function BookingUserInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    outbound,
    return: returnFlight,
    totalAmount,
    passengers,
  } = location.state || {};

  const [formDataList, setFormDataList] = useState(
    Array.from({ length: passengers || 1 }, () => ({
      gender: "Nam",
      firstName: "",
      lastName: "",
      birthDate: "",
      country: "Việt Nam",
      phone: "",
      email: "",
      idNumber: "",
      address: "",
    }))
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [selectedOption, setSelectedOption] = useState("VNPay");

  const qrImages = {
    VNPay: "assets/payments/qr-vnpay.png",
    MoMo: "assets/payments/qr-momo.png",
    Banking: "assets/payments/qr-banking.png",
  };

  const formatFlightDateTime = (departureTime, arrivalTime) => {
    const formatDateTime = (date) =>
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    return `${formatDateTime(departure)} - ${formatDateTime(arrival)}`;
  };

  const scrollToTop = () => {
    setTimeout(() => {
      smoothScrollToTop();
    }, 100);
  };

  const validateFormDataList = (formDataList) => {
    const errors = [];

    for (let i = 0; i < formDataList.length; i++) {
      const formData = formDataList[i];
      const error = {};

      if (!formData.firstName.trim()) {
        error.firstName = "Vui lòng nhập họ";
      }

      if (!formData.lastName.trim()) {
        error.lastName = "Vui lòng nhập tên";
      }

      if (!formData.phone.trim()) {
        error.phone = "Vui lòng nhập số điện thoại";
      }

      if (!formData.email.trim()) {
        error.email = "Vui lòng nhập email";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          error.email = "Email không hợp lệ";
        }
      }

      if (!formData.idNumber.trim()) {
        error.idNumber = "Vui lòng nhập CCCD/CMND";
      }
      if (!formData.birthDate.trim()) {
        error.birthDate = "Vui lòng nhập ngày sinh";
      }

      errors.push(error);
    }

    setFormErrors(errors);

    // Return true if there are any errors
    return errors.some((e) => Object.keys(e).length > 0);
  };

  const handleInputChange = (index, field, value) => {
    setFormDataList((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSubmit = async () => {
    const hasValidationErrors = validateFormDataList(formDataList);
    if (hasValidationErrors) {
      setError("Vui lòng kiểm tra lại thông tin");
      smoothScrollToTop();
      return;
    }

    setLoading(true);
    setError(null);
    let bookingCodelist = [];
    let emailList = [];
    let name = "";

    try {
      for (const formData of formDataList) {
        // Create booking for outbound flight
        const outboundBookingData = {
          flight_id: outbound._id,
          total_amount: totalAmount / passengers / (returnFlight ? 2 : 1),
          guest_info: {
            full_name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            id_number: formData.idNumber,
            address: formData.address,
          },
          status: "pending",
        };

        let response = await axios.post(
          localStorage.getItem("role") != null
            ? "/bookings/user/createBooking"
            : "/bookings/createBooking",
          outboundBookingData
        );

        console.log("Outbound booking created:", response);
        bookingCodelist.push(response.populatedBooking._id);
        emailList.push(formData.email);
        name = `${formData.firstName} ${formData.lastName}`;

        // Create booking for return flight (if available)
        if (returnFlight) {
          const returnBookingData = {
            flight_id: returnFlight._id,
            total_amount: totalAmount / passengers / 2,
            guest_info: {
              full_name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              gender: formData.gender,
              id_number: formData.idNumber,
              address: formData.address,
            },
            status: "pending",
          };

          response = await axios.post(
            localStorage.getItem("role") != null
              ? "/bookings/user/createBooking"
              : "/bookings/createBooking",
            returnBookingData
          );

          console.log("Return booking created:", response);
          bookingCodelist.push(response._id);
        }
      }

      navigate("/TicketSuccess", {
        state: { bookingCodelist, emailList, name },
      });
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !error) {
      scrollToTop();
    }
  }, [loading, error]);

  return (
    <div className="booking-container">
      <div className="booking-user-info">
        <header className="quick-pick-banner">
          <div className="quick-pick-left">
            <div className="quick-pick-text">
              <h3>Hoàn thành thông tin đặt vé</h3>
              <p>Chúc quý khách tận hưởng khi chọn QAirline</p>
            </div>
          </div>
        </header>

        <section className="form-container">
          {formDataList.map((formData, index) => (
            <div key={index} className="form-grid">
              <div className="header">Hành khách {index + 1}</div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Họ*"
                  value={formData.firstName}
                  className={formErrors[index]?.firstName ? "error-input" : ""}
                  onChange={(e) =>
                    handleInputChange(index, "firstName", e.target.value)
                  }
                />
                {formErrors[index]?.firstName && (
                  <span className="error-text">
                    {formErrors[index].firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Tên*"
                  value={formData.lastName}
                  className={formErrors[index]?.lastName ? "error-input" : ""}
                  onChange={(e) =>
                    handleInputChange(index, "lastName", e.target.value)
                  }
                />
                {formErrors[index]?.lastName && (
                  <span className="error-text">
                    {formErrors[index].lastName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="date"
                  placeholder="MM/DD/YYYY*"
                  value={formData.birthDate}
                  className={formErrors[index]?.birthDate ? "error-input" : ""}
                  onChange={(e) =>
                    handleInputChange(index, "birthDate", e.target.value)
                  }
                />
                {formErrors[index]?.birthDate && (
                  <span className="error-text">
                    {formErrors[index].birthDate}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Số điện thoại*"
                  value={formData.phone}
                  className={formErrors[index]?.phone ? "error-input" : ""}
                  onChange={(e) =>
                    handleInputChange(index, "phone", e.target.value)
                  }
                />
                {formErrors[index]?.phone && (
                  <span className="error-text">{formErrors[index].phone}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email*"
                  value={formData.email}
                  className={formErrors[index]?.email ? "error-input" : ""}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                />
                {formErrors[index]?.email && (
                  <span className="error-text">{formErrors[index].email}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="CCCD/CMND*"
                  value={formData.idNumber}
                  className={formErrors[index]?.idNumber ? "error-input" : ""}
                  onChange={(e) =>
                    handleInputChange(index, "idNumber", e.target.value)
                  }
                />
                {formErrors[index]?.idNumber && (
                  <span className="error-text">
                    {formErrors[index].idNumber}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nơi ở hiện tại"
                  value={formData.address}
                  className={formErrors[index]?.address ? "error-input" : ""}
                  onChange={(e) =>
                    handleInputChange(index, "address", e.target.value)
                  }
                />
                {formErrors[index]?.address && (
                  <span className="error-text">
                    {formErrors[index].address}
                  </span>
                )}
              </div>
            </div>
          ))}

          <div className="payment-section">
            <div className="payment-header">Chọn phương thức thanh toán</div>
            <div className="payment-options">
              {Object.keys(qrImages).map((option) => (
                <label key={option} className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                  />
                  <img src={qrImages[option]} alt={option} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? <ClipLoader size={20} /> : "Hoàn tất"}
            </button>
          </div>
        </section>
      </div>

      <aside className="booking-summary">
        <h3>Thông tin đặt chỗ</h3>
        <div className="flight-info">
          <h4>Chuyến đi</h4>
          <p>
            {outbound?.origin_airport_id.city} →{" "}
            {outbound?.destination_airport_id.city}
          </p>
          <p>
            {formatFlightDateTime(
              outbound?.scheduled_departure,
              outbound?.scheduled_arrival
            )}
          </p>
        </div>
        {returnFlight && (
          <div className="flight-info">
            <h4>Chuyến về</h4>
            <p>
              {returnFlight?.origin_airport_id.city} →{" "}
              {returnFlight?.destination_airport_id.city}
            </p>
            <p>
              {formatFlightDateTime(
                returnFlight?.scheduled_departure,
                returnFlight?.scheduled_arrival
              )}
            </p>
          </div>
        )}
        <div className="total">
          <h4>Tổng tiền</h4>
          <p>{totalAmount?.toLocaleString()} VND</p>
        </div>
      </aside>
    </div>
  );
}
