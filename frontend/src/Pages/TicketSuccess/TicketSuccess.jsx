import React, { useEffect, useState } from "react";
import { Check, Copy, Home } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./TicketSuccess.scss";
import axios from "../../Apis/axios";
const TicketSuccess = () => {
  const [copied, setCopied] = useState(false);
  // Example ticket code
  const location = useLocation();
  const { bookingCodelist, emailList, name } = location.state || {};

  console.log("booking", bookingCodelist);
  // const ticketCode = bookingCodelist.map((item) => item._id);
  // let ticketCode = 1;
  console.log("emailList", emailList);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        bookingCodelist.map((item) => item + "\n")
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const sendEmail = async (ticketCode, customerName, email) => {
    try {
      const response = await axios.post("/send-email", {
        ticketCode,
        customerName,
        email,
      });

      if (response.status === 200) {
        // Kiểm tra nếu response status là 200
        console.log("Email sent successfully!");
      } else {
        console.log("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  console.log(emailList.map((email) => email));

  useEffect(() => {
    const sendEmails = async () => {
      if (emailList) {
        // Sử dụng vòng lặp for để đảm bảo gửi email đồng bộ
        for (let i = 0; i < emailList.length; i++) {
          const email = emailList[i];
          await sendEmail(bookingCodelist, name ? name : "Customer", email);
        }
      }
    };

    sendEmails();
  }, []);
  return (
    <div className="ticket-success">
      <div className="ticket-success__container">
        {/* Success Icon */}
        <div className="ticket-success__icon">
          <Check />
        </div>

        {/* Success Message */}
        <h1 className="ticket-success__title">Đặt vé thành công!</h1>
        <p className="ticket-success__description">
          Cảm ơn bạn đã đặt vé. Dưới đây là mã vé của bạn:
          <br />
          <strong>Lưu ý: nếu có nhiều vé,các vé cách nhau bởi dấu phẩy</strong>
        </p>

        {/* Ticket Code */}
        <div className="ticket-success__code-container">
          <code className="ticket-success__code">
            {bookingCodelist.map((item) => item + "\n")}
          </code>
          <button
            onClick={copyToClipboard}
            className={`ticket-success__copy-button ${
              copied ? "ticket-success__copy-button--copied" : ""
            }`}
            aria-label="Copy ticket code"
          >
            {copied ? <Check /> : <Copy />}
          </button>
        </div>

        {/* Copy Status */}
        {copied && (
          <p className="ticket-success__copy-message">
            Đã sao chép mã vé vào clipboard!
          </p>
        )}

        {/* Home Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="ticket-success__home-button"
        >
          <Home />
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default TicketSuccess;
