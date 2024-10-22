import { z } from 'zod';

export const reservationSchema = z.object({
    train: z.string().min(1, 'L\'ID du train doit contenir au moins 1 caractères.'),
});