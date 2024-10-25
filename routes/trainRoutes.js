import express from "express";
import { addTrain, getTrains, getTrainById, deleteTrain, updateTrain } from "../controllers/trainController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { trainSchema } from "../schemas/trainSchema.js";
import { updatetrainSchema } from "../schemas/updatetrainSchema.js";

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
 *   name: Trains
 *   description: API for managing trains
 */

router.get("/", getTrains);

router.get("/:id", getTrainById);

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.post("/", validateSchemaMiddleware(trainSchema), addTrain);

router.put("/:id", validateSchemaMiddleware(updatetrainSchema), updateTrain);

router.delete("/:id", deleteTrain);

export default router;

/**
 * @swagger
 * /trains:
 *   get:
 *     summary: Retrieve all trains
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: List of trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The train ID
 *                   name:
 *                     type: string
 *                     description: The name of the train
 *                   start_station:
 *                     type: string
 *                     description: The starting station
 *                   end_station:
 *                     type: string
 *                     description: The ending station
 *                   time_of_departure:
 *                     type: string
 *                     format: date-time
 *                     description: Departure time
 *                   time_of_arrival:
 *                     type: string
 *                     format: date-time
 *                     description: Arrival time
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trains/{id}:
 *   get:
 *     summary: Retrieve a train by ID
 *     tags: [Trains]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The train ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The train details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The train ID
 *                 name:
 *                   type: string
 *                   description: The name of the train
 *                 start_station:
 *                   type: string
 *                   description: The starting station
 *                 end_station:
 *                   type: string
 *                   description: The ending station
 *                 time_of_departure:
 *                   type: string
 *                   format: date-time
 *                   description: Departure time
 *                 time_of_arrival:
 *                   type: string
 *                   format: date-time
 *                   description: Arrival time
 *       404:
 *         description: Train not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trains:
 *   post:
 *     summary: Add a new train
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_station:
 *                 type: string
 *               end_station:
 *                 type: string
 *               time_of_departure:
 *                 type: string
 *                 format: date-time
 *               time_of_arrival:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Train added successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trains/{id}:
 *   put:
 *     summary: Update a train by ID
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The train ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_station:
 *                 type: string
 *               end_station:
 *                 type: string
 *               time_of_departure:
 *                 type: string
 *                 format: date-time
 *               time_of_arrival:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Train updated successfully
 *       404:
 *         description: Train not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /trains/{id}:
 *   delete:
 *     summary: Delete a train by ID
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The train ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train deleted successfully
 *       404:
 *         description: Train not found
 *       500:
 *         description: Server error
 */
