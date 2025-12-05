
// server/routes/estimate.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEstimate, getEstimates, updateEstimate, deleteEstimate } from "../controllers/estimateController.js";

const router = express.Router();

router.post("/add", authMiddleware, addEstimate);
router.get("/", authMiddleware, getEstimates);
router.put("/:id", authMiddleware, updateEstimate);
router.delete("/:id", authMiddleware, deleteEstimate);


export default router;


