import express from "express";
import { addTrainstation, getTrainstationById, getTrainstations, updateTrainstation, deleteTrainstation } from "../controllers/trainstationController.js";

const router = express.Router();

router.post("/", addTrainstation);

router.get("/", getTrainstations);

router.get("/:id", getTrainstationById);

router.put("/:id", updateTrainstation);

router.delete("/:id", deleteTrainstation);

export default router;

