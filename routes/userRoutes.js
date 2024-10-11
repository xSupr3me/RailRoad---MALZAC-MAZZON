import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, getAllUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { registerSchema } from "../schemas/registerSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { loginSchema } from "../schemas/loginSchema.js";
import { updateSchema } from "../schemas/updateSchema.js";
// import { restrictRoleUpdate } from "../middlewares/restrictRoleMiddleware.js";

const router = express.Router();

router.post("/register",validateSchemaMiddleware(registerSchema) ,registerUser);

router.post("/login",validateSchemaMiddleware(loginSchema),loginUser);

router.use(authMiddleware);

router.get("/all",roleMiddleware(['admin', 'employee']), getAllUsers);

router.get("/:id",roleMiddleware(['admin', 'employee']), getUserProfile);

router.put("/:id", roleMiddleware(['admin']), validateSchemaMiddleware(updateSchema), updateUserProfile);

router.delete("/:id",roleMiddleware(['admin']), deleteUser);

export default router;