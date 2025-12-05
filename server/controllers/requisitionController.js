// server/controllers/requisitionController.js
import Requisition from "../models/Requisition.js";

export const addRequisition = async (req, res) => {
  try {
    const data = req.body;
    const exists = await Requisition.findOne({ requisition_no: data.requisition_no });
    if (exists) return res.status(400).json({ success: false, message: "Requisition no already exists" });

    const requs = new Requisition(data);
    await requs.save();
    res.status(201).json({ success: true, requisition: requs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getRequisitions = async (req, res) => {
  try {
    const list = await Requisition.find().sort({ createdAt: -1 });
    res.json({ success: true, requisitions: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateRequisition = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.requisition_no) {
      const exists = await Requisition.findOne({
        requisition_no: req.body.requisition_no,
        _id: { $ne: id }
      });
      if (exists) return res.status(400).json({ success: false, message: "Requisition no already used" });
    }

    const updated = await Requisition.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, requisition: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteRequisition = async (req, res) => {
  try {
    const deleted = await Requisition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

