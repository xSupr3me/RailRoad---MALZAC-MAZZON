import express from "express";
import { addTrainstation, getTrainstationById, getTrainstations, updateTrainstation, deleteTrainstation } from "../controllers/trainstationController.js";
import { upload } from "../utils/upload.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";


const router = express.Router();

router.get("/", getTrainstations);

router.get("/:id", getTrainstationById);

router.use(authMiddleware)
router.use(roleMiddleware(['admin']))

router.post("/", upload.single('image'), addTrainstation);

router.put("/:id", upload.single('image'), updateTrainstation);

router.delete("/:id", deleteTrainstation);

export default router;