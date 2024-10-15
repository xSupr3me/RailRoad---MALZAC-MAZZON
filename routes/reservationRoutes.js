import express from 'express';
import { createReservation, getUserReservations, cancelReservation } from '../controllers/reservationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', roleMiddleware(['admin', 'employee']), createReservation);

router.get('/', roleMiddleware(['admin', 'employee']), getUserReservations);

router.delete('/:id', roleMiddleware(['admin', 'employee']), cancelReservation);

export default router;