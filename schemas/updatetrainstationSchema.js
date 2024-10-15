import {z} from "zod";

export const updatetrainstationSchema = z.object({
    name: z.string().min(1, 'Le nom de la gare doit contenir au moins 3 caractères.').optional(),
    open_hour: z.string().min(1, 'L\'heure d\'ouverture doit contenir au moins 3 caractères.').optional(),
    close_hour: z.string().min(1, 'L\'heure de fermeture doit contenir au moins 3 caractères.').optional(),
});