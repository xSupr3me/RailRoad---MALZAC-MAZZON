import express from "express";
import { addTrainstation, getTrainstationById, getTrainstations, updateTrainstation, deleteTrainstation } from "../controllers/trainstationController.js";
import { uploadMiddleware } from "../middlewares/multerMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";


const router = express.Router();

router.get("/", getTrainstations);

router.get("/:id", getTrainstationById);

router.use(authMiddleware)
router.use(roleMiddleware(['admin']))

router.post("/", uploadMiddleware, addTrainstation);

router.put("/:id", uploadMiddleware, updateTrainstation);

router.delete("/:id", deleteTrainstation);

export default router;