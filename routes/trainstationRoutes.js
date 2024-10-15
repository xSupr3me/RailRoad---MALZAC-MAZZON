import express from "express";
import { addTrainstation, getTrainstationById, getTrainstations, updateTrainstation, deleteTrainstation } from "../controllers/trainstationController.js";
import { uploadMiddleware } from "../middlewares/multerMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { trainstationSchema } from "../schemas/trainstationSchema.js";
import { updatetrainstationSchema } from "../schemas/updatetrainstationSchema.js";


const router = express.Router();

router.get("/", getTrainstations);

router.get("/:id", getTrainstationById);

router.use(authMiddleware)
router.use(roleMiddleware(['admin']))

router.post("/", uploadMiddleware,validateSchemaMiddleware(trainstationSchema), addTrainstation);

router.put("/:id", uploadMiddleware,validateSchemaMiddleware(updatetrainstationSchema), updateTrainstation);

router.delete("/:id", deleteTrainstation);

export default router;