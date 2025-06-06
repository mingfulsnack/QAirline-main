import { useState } from "react";
import PropTypes from "prop-types";

function RequestCancel({ bookingDetails, onConfirm, onClose }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(false);

  const handleConfirm = () => {
    if (!acceptedTerms || !selectedCustomer || !selectedJourney) {
      alert("Vui lòng chọn đầy đủ thông tin và chấp nhận điều khoản");
      return;
    }
    onConfirm({
      bookingId: bookingDetails?._id,
      guestInfo: bookingDetails?.guest_info,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "0";
    return amount.toLocaleString("vi-VN");
  };

  // Check if booking is still cancellable
  const isCancellable = () => {
    if (!bookingDetails?.cancellation_deadline) return true;
    const deadline = new Date(bookingDetails.cancellation_deadline);
    const now = new Date();
    return now <= deadline;
  };

  if (!bookingDetails) {
    return (
      <div className="requestCancel">
        <div className="header">
          <h2 className="blue">YÊU CẦU HỦY ĐẶT CHỖ</h2>
        </div>
        <div className="content">
          <p>Không tìm thấy thông tin đặt chỗ</p>
          {onClose && (
            <div className="findingBut">
              <button onClick={onClose}>Đóng</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const canCancel = isCancellable();

  return (
    <div className="requestCancel">
      <div className="header">
        <h2 className="blue">YÊU CẦU HỦY ĐẶT CHỖ</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        )}
      </div>

      <div className="content">
        <div className="code">
          <p className="blue">Mã đặt chỗ: {bookingDetails._id}</p>
        </div>

        <div className="customer box">
          <input
            type="checkbox"
            id="customer-checkbox"
            checked={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.checked)}
            disabled={!canCancel}
          />
          <label htmlFor="customer-checkbox" className="checkbox-content">
            <div className="left">
              <p>Hành khách</p>
              <p className="blue">
                {bookingDetails.guest_info?.full_name ||
                  bookingDetails.userId ||
                  "Không có thông tin"}
              </p>
            </div>
            <div className="right">
              <p>Ngày đặt</p>
              <p className="blue">{formatDate(bookingDetails.booking_date)}</p>
            </div>
          </label>
        </div>

        <div className="journey box">
          <input
            type="checkbox"
            id="journey-checkbox"
            checked={selectedJourney}
            onChange={(e) => setSelectedJourney(e.target.checked)}
            disabled={!canCancel}
          />
          <label htmlFor="journey-checkbox" className="checkbox-content">
            <div>
              <p className="blue">Thông tin đặt chỗ</p>
              <p>Số tiền: {formatCurrency(bookingDetails.total_amount)} VND</p>
              <p>Hạn huỷ: {formatDate(bookingDetails.cancellation_deadline)}</p>
              <p>Email: {bookingDetails.guest_info?.email || "Không có"}</p>
              <p>SĐT: {bookingDetails.guest_info?.phone || "Không có"}</p>
            </div>
          </label>
        </div>

        {!canCancel && (
          <div className="warning box">
            <p className="error">
              ⚠️ Đã quá hạn hủy đặt chỗ. Vui lòng liên hệ với chúng tôi để được
              hỗ trợ.
            </p>
          </div>
        )}

        <div className="acpt box">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            disabled={!canCancel}
          />
          <label htmlFor="terms-checkbox">Chấp nhận điều khoản hủy chỗ</label>
        </div>

        <div className="findingBut">
          <button
            onClick={handleConfirm}
            disabled={
              !canCancel ||
              !acceptedTerms ||
              !selectedCustomer ||
              !selectedJourney
            }
            className={!canCancel ? "disabled" : ""}
          >
            {canCancel ? "Tiếp tục" : "Không thể hủy"}
          </button>
          {onClose && (
            <button onClick={onClose} className="secondary">
              Hủy bỏ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

RequestCancel.propTypes = {
  bookingDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    guest_info: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    userId: PropTypes.string,
    booking_date: PropTypes.string,
    total_amount: PropTypes.number,
    cancellation_deadline: PropTypes.string,
  }),
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default RequestCancel;
