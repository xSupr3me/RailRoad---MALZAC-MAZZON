import express from 'express';
import { createReservation, getUserReservations, cancelReservation, deleteReservation, getAllReservations } from '../controllers/reservationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { validateReservation } from '../controllers/reservationController.js';
import { reservationSchema } from '../schemas/reservationSchema.js';
import { updatereservationSchema } from '../schemas/updatereservationSchema.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';


const router = express.Router();

router.get('/all', getAllReservations);

router.use(authMiddleware);

router.post('/', roleMiddleware(['admin', 'employee']), validateSchemaMiddleware(reservationSchema), createReservation);

router.get('/', roleMiddleware(['admin', 'employee']), getUserReservations);

router.get('/:id', roleMiddleware(['admin', 'employee']), getUserReservations);

router.delete('/delete/:id', roleMiddleware(['admin']), deleteReservation);

router.put('/cancel/:id', roleMiddleware(['admin', 'employee']), validateSchemaMiddleware(updatereservationSchema), cancelReservation);

router.put('/validate/:id', roleMiddleware(['admin', 'employee']), validateSchemaMiddleware(updatereservationSchema), validateReservation);





export default router;