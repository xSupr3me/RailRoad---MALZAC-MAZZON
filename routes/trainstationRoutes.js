import express from "express";
import {
  addTrainstation,
  getTrainstationById,
  getTrainstations,
  updateTrainstation,
  deleteTrainstation
} from "../controllers/trainstationController.js";
import { uploadMiddleware } from "../middlewares/multerMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { trainstationSchema } from "../schemas/trainstationSchema.js";
import { updatetrainstationSchema } from "../schemas/updatetrainstationSchema.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Trainstations
 *   description: API for managing train stations
 */

router.get("/", getTrainstations);

router.get("/:id", getTrainstationById);

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.post("/", uploadMiddleware, validateSchemaMiddleware(trainstationSchema), addTrainstation);

router.put("/:id", uploadMiddleware, validateSchemaMiddleware(updatetrainstationSchema), updateTrainstation);

router.delete("/:id", deleteTrainstation);

export default router;

/**
 * @swagger
 * /trainstations:
 *   get:
 *     summary: Retrieve all train stations
 *     tags: [Trainstations]
 *     responses:
 *       200:
 *         description: List of train stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The train station ID
 *                   name:
 *                     type: string
 *                     description: The name of the train station
 *                   open_hour:
 *                     type: string
 *                     description: Opening hour
 *                   close_hour:
 *                     type: string
 *                     description: Closing hour
 *                   image:
 *                     type: string
 *                     description: Path to the image
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trainstations/{id}:
 *   get:
 *     summary: Retrieve a train station by ID
 *     tags: [Trainstations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The train station ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The train station details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The train station ID
 *                 name:
 *                   type: string
 *                   description: The name of the train station
 *                 open_hour:
 *                   type: string
 *                   description: Opening hour
 *                 close_hour:
 *                   type: string
 *                   description: Closing hour
 *                 image:
 *                   type: string
 *                   description: Path to the image
 *       404:
 *         description: Train station not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trainstations:
 *   post:
 *     summary: Add a new train station
 *     tags: [Trainstations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               open_hour:
 *                 type: string
 *               close_hour:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Train station added successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trainstations/{id}:
 *   put:
 *     summary: Update a train station by ID
 *     tags: [Trainstations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The train station ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               open_hour:
 *                 type: string
 *               close_hour:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Train station updated successfully
 *       404:
 *         description: Train station not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trainstations/{id}:
 *   delete:
 *     summary: Delete a train station by ID
 *     tags: [Trainstations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The train station ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train station deleted successfully
 *       404:
 *         description: Train station not found
 *       500:
 *         description: Server error
 */
