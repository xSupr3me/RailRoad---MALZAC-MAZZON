import express from "express";
import { addTrain, getTrains, getTrainById, deleteTrain, updateTrain } from "../controllers/trainController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";


const router = express.Router();

router.get("/", getTrains);

router.get("/:id", getTrainById);

router.use(authMiddleware)
router.use(roleMiddleware(['admin']))

router.post("/", addTrain);

router.put("/:id", updateTrain);

router.delete("/:id", deleteTrain);

export default router;