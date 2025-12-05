

// server/controllers/estimateController.js
import Estimate from "../models/Estimate.js";

export const addEstimate = async (req, res) => {
  try {
    const data = req.body;
    // ensure unique estimate_no server-side
    const exists = await Estimate.findOne({ estimate_no: data.estimate_no });
    if (exists) return res.status(400).json({ success: false, message: "Estimate no exists" });
    const est = new Estimate(data);
    await est.save();
    res.status(201).json({ success: true, estimate: est });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getEstimates = async (req, res) => {
  try {
    const list = await Estimate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, estimates: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateEstimate = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Estimate.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, estimate: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteEstimate = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Estimate.findById(id);
    if (!found) return res.status(404).json({ success: false, message: "Not found" });
    await Estimate.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
