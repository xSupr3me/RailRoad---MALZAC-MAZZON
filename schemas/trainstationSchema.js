import {z} from "zod";

export const trainstationSchema = z.object({
    name: z.string().min(1, 'Le nom de la gare doit contenir au moins 3 caractères.'),
    open_hour: z.string().min(1, 'L\'heure d\'ouverture doit contenir au moins 3 caractères.'),
    close_hour: z.string().min(1, 'L\'heure de fermeture doit contenir au moins 3 caractères.'),
});