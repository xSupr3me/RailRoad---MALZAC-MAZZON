import express from 'express';
import { createReservation, getUserReservations, cancelReservation, deleteReservation, getAllReservations } from '../controllers/reservationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', roleMiddleware(['admin', 'employee']), createReservation);

router.get('/', roleMiddleware(['admin', 'employee']), getUserReservations);

router.get('/all', roleMiddleware(['admin']), getAllReservations);

router.delete('/:id', roleMiddleware(['admin', 'employee']), cancelReservation);

router.delete('/delete/:id', roleMiddleware(['admin']), deleteReservation);





export default router;