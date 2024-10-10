import express from "express";
import { addTrain, getTrains, getTrainById, deleteTrain, updateTrain } from "../controllers/trainController.js";


const router = express.Router();

router.post("/", addTrain);

router.get("/", getTrains);

router.get("/:id", getTrainById);

router.put("/:id", updateTrain);

router.delete("/:id", deleteTrain);

export default router;

