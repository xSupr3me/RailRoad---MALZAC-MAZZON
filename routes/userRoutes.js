import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { registerSchema } from "../schemas/registerSchema.js";

const router = express.Router();

router.post("/register",validateSchemaMiddleware(registerSchema) ,registerUser);

router.post("/login",loginUser);

router.use(authMiddleware);

router.get("/:id",   getUserProfile);

router.put("/:id", updateUserProfile);

router.delete("/:id", deleteUser);

export default router;