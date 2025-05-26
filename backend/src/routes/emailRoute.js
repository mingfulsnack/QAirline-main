// api/send-email

const router = require("express").Router();
const emailNotification = require("../SideCar/emailNotification");
const AuthController = require("../app/controllers/AuthController");

router.post("/", async (req, res) => {
  const { ticketCode, name, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "No recipient email provided" });
  }

  try {
    await emailNotification.sendEmail(ticketCode, name, email);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to send email");
  }
});

router.post("/forgot-password", AuthController.forgotPassword);

module.exports = router;
