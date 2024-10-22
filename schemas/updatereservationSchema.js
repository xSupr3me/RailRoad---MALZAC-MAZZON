import { z } from 'zod';

export const updatereservationSchema = z.object({
    status: z.string().min(1, 'Le statut de la réservation doit contenir au moins 1 caractères.'),
});