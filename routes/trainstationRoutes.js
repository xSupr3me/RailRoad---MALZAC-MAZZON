import express from "express";
import { addTrainstation, getTrainstationById, getTrainstations, updateTrainstation, deleteTrainstation } from "../controllers/trainstationController.js";
import { upload } from "../upload.js";


const router = express.Router();


router.post("/", upload.single('image'), addTrainstation);

router.put("/:id", upload.single('image'), updateTrainstation);

router.get("/", getTrainstations);

router.get("/:id", getTrainstationById);

router.delete("/:id", deleteTrainstation);

export default router;

