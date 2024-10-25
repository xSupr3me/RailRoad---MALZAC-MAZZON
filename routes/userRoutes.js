import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, getAllUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { registerSchema } from "../schemas/registerSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { loginSchema } from "../schemas/loginSchema.js";
import { updateaccountSchema } from "../schemas/updateaccountSchema.js";
import { restrictRoleMiddleware } from "../middlewares/restrictRoleMiddleware.js";


const router = express.Router();

router.post("/register",validateSchemaMiddleware(registerSchema) ,registerUser);

router.post("/login",validateSchemaMiddleware(loginSchema),loginUser);

router.use(authMiddleware);

router.get("/all",roleMiddleware(['admin', 'employee']), getAllUsers);

router.get("/:id",roleMiddleware(['admin', 'employee']), getUserProfile);

router.put("/:id", roleMiddleware(['admin']), restrictRoleMiddleware, validateSchemaMiddleware(updateaccountSchema), updateUserProfile);

router.delete("/:id",roleMiddleware(['admin']), deleteUser);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User with this email already exists
 *       500:
 *         description: An error occurred while registering the user
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: Password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: An error occurred during login
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: No token provided, authorization denied
 *       403:
 *         description: Forbidden for unauthorized users
 *       500:
 *         description: An error occurred while retrieving users
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while retrieving the user
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's new username
 *                 example: johndoe123
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's new email
 *                 example: johndoe123@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while updating the user
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while deleting the user
 */