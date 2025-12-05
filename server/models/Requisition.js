
// server/models/Requisition.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    description: String,
    qty: { type: Number, required: true, min: 1, default: 1 },
    unit: { type: String, default: "pcs" },
    price: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { _id: false }
);

const requisitionSchema = new mongoose.Schema(
  {
    requisition_no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    issue_date: { type: Date, default: Date.now },
    required_date: Date,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Ordered"],
      default: "Pending",
    },
    logo: String, // base64 logo
    requested_by: {
      name: { type: String, required: true },
      department: String,
      phone: String,
      email: String,
      address: String,
    },
    purpose: String,
    items: {
      type: [itemSchema],
      validate: [v => v.length > 0, "At least one item is required"],
    },
    subtotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    notes: String,
    reference_name_for_note: String,
    reference_mobile_for_note: String,
    reference_address_for_note: String,
  },
  { timestamps: true }
);

// Auto-calculate totals
requisitionSchema.pre("save", function (next) {
  this.items.forEach(i => {
    i.total = Number((i.qty * i.price).toFixed(2));
  });
  const total = this.items.reduce((sum, i) => sum + i.total, 0);
  this.subtotal = Number(total.toFixed(2));
  this.total = Number(total.toFixed(2));
  next();
});

export default mongoose.model("Requisition", requisitionSchema);




