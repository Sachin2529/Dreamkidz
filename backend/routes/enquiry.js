const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/enquiry — save enquiry + send email
router.post("/", async (req, res) => {
  try {
    const { name, mobile, quantity, comments, productName, styleNumber } = req.body;

    // Basic validation
    if (!name || !mobile || !quantity || !productName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save to database
    const enquiry = new Enquiry({ name, mobile, quantity, comments, productName, styleNumber });
    await enquiry.save();

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Enquiry: ${productName} from ${name}`,
      html: `
        <h2>New DreamKidz Enquiry</h2>
        <table>
          <tr><td><b>Name:</b></td><td>${name}</td></tr>
          <tr><td><b>Mobile:</b></td><td>${mobile}</td></tr>
          <tr><td><b>Product:</b></td><td>${productName} (${styleNumber})</td></tr>
          <tr><td><b>Quantity:</b></td><td>${quantity}</td></tr>
          <tr><td><b>Comments:</b></td><td>${comments || "—"}</td></tr>
        </table>
      `,
    });

    res.json({ success: true, message: "Enquiry submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/enquiry — for admin panel
router.get("/", async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
});

// PATCH /api/enquiry/:id — mark as replied
router.patch("/:id", async (req, res) => {
  await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ success: true });
});

module.exports = router;