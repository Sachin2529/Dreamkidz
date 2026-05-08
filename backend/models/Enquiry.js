const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  mobile:      { type: String, required: true },
  quantity:    { type: Number, required: true },
  comments:    { type: String },
  productName: { type: String, required: true },
  styleNumber: { type: String, required: true },
  status:      { type: String, default: "new" },   // new / replied
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enquiry", enquirySchema);