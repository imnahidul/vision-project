
// server/models/Estimate.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item: String,
  description: String,
  qty: { type: Number, default: 1 },
  //unit: { type: String, default: "pcs" },
  price: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const estimateSchema = new mongoose.Schema({
  estimate_no: { type: String, required: true, unique: true },
  reference_name: String,
  issue_date: Date,
  expire_date: Date,
  status: { type: String, default: "Draft" },
  logo: String,
  estimate_to: {
    company_name: String,
    client_name: String,
    email: String,
    phone: String,
    address: String,
  },
  pay_to: {
    company_name: String,
    client_name: String,
    email: String,
    phone: String,
    address: String,
  },
  items: [itemSchema],
  subtotal: Number,
  discountPercent: Number,
  taxPercent: Number,
  taxAmount: Number,
  total: Number,
  notes: String,
  reference_name_for_note: String,
  reference_address_for_note: String,
  reference_mobile_for_note: String,
}, { timestamps: true });

export default mongoose.model("Estimate", estimateSchema);
