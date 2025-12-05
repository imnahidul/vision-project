// server/routes/requisition.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addRequisition,
  getRequisitions,
  updateRequisition,
  deleteRequisition,
} from "../controllers/requisitionController.js";

const router = express.Router();

router.post("/add", authMiddleware, addRequisition);
router.get("/", authMiddleware, getRequisitions);
router.put("/:id", authMiddleware, updateRequisition);
router.delete("/:id", authMiddleware, deleteRequisition);

export default router;

