import express from 'express';
import { createReservation, getUserReservations, cancelReservation, deleteReservation, getAllReservations } from '../controllers/reservationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { validateReservation } from '../controllers/reservationController.js';
import { reservationSchema } from '../schemas/reservationSchema.js';
import { updatereservationSchema } from '../schemas/updatereservationSchema.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';


const router = express.Router();



router.use(authMiddleware);

router.post('/', roleMiddleware(['admin', 'employee']), validateSchemaMiddleware(reservationSchema), createReservation);

router.get('/', roleMiddleware(['admin', 'employee']), getUserReservations);

router.get('/:id', roleMiddleware(['admin', 'employee']), getUserReservations);

router.get('/all', roleMiddleware(['admin']), getAllReservations);

router.delete('/delete/:id', roleMiddleware(['admin']), deleteReservation);

router.put('/cancel/:id', roleMiddleware(['admin', 'employee']), validateSchemaMiddleware(updatereservationSchema), cancelReservation);

router.put('/validate/:id', roleMiddleware(['admin', 'employee']), validateReservation);


export default router;


/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing train reservations
 */

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
 * /reservations/all:
 *   get:
 *     summary: Retrieve all reservations
 *     security:
 *      - bearerAuth: []
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Successfully retrieved all reservations
 *       404:
 *         description: No reservations found
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Invalid train ID
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get reservations for the authenticated user
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved reservations
 *       404:
 *         description: No reservations found for this user
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a specific reservation by ID for the authenticated user
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Successfully retrieved reservation
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * /reservations/delete/{id}:
 *   delete:
 *     summary: Delete a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found or permission denied
 */

/**
 * @swagger
 * /reservations/cancel/{id}:
 *   put:
 *     summary: Cancel a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation cancelled successfully
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * /reservations/validate/{id}:
 *   put:
 *     summary: Validate a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation validated successfully
 *       404:
 *         description: Reservation not found
 */
