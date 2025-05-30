const nodemailer = require("nodemailer");

class EmailNotification {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Thêm thuộc tính để lưu thời gian gửi email cuối cùng
    this.lastSentTime = 0;
    this.minInterval = 60000; // 60 giây (thời gian tối thiểu giữa các lần gửi)
  }

  // Phương thức để gửi email
  async sendEmail(ticketCode, email) {
    const currentTime = Date.now();

    // Kiểm tra nếu thời gian giữa các lần gửi chưa đủ
    if (currentTime - this.lastSentTime < this.minInterval) {
      console.log("Please wait before sending another email.");
      return;
    }
    this.lastSentTime = currentTime; // Cập nhật ngay trước khi gửi email
    console.log("Sending email:", { ticketCode, email });

    const letter = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your Ticket Confirmation",
      text: `Dear ${
        email.split("@")[0]
      },\n\nThank you for booking with us. Your ticket code is: ${ticketCode}.\nPlease keep this code for your reference.\n\nBest regards,\nThe Booking Team`,
    };

    try {
      await this.transporter.sendMail(letter);
      console.log("Email sent successfully");

      // Cập nhật thời gian gửi email sau khi gửi thành công
      this.lastSentTime = currentTime;
    } catch (error) {
      console.log(error);
      console.log(
        "Failed to send email. The code is implemented in monitor/sidecar/emailNotification.js"
      );
    }
  }

  async sendForgotPasswordEmail(email, password) {
    try {
      const letter = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Forgot Password",
        text: `Your new password is: ${password}. Please change it after logging in.\n\nBest regards,\nThe Booking Team`,
      };

      await this.transporter.sendMail(letter);
      console.log("ForgotPassword Email sent successfully");
    } catch (error) {
      console.log(error);
      console.log(
        "Failed to send email. The code is implemented in monitor/sidecar/emailNotification.js"
      );
    }
  }
}

module.exports = new EmailNotification();
