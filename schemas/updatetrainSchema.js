import {z} from "zod";

export const updatetrainSchema = z.object({
    name: z.string().min(1, 'Le nom du train doit contenir au moins 1 caractères.').optional(),
    start_station: z.string().min(1, 'La gare de départ doit contenir au moins 1 caractères.').optional(),
    end_station: z.string().min(1, 'La gare d\'arrivée doit contenir au moins 1 caractères.').optional(),
    time_of_departure: z.string().min(1, 'La gare d\'arrivée doit contenir au moins 1 caractères.').optional(),
    time_of_arrival: z.string().min(1, 'La gare d\'arrivée doit contenir au moins 1 caractères.').optional(),
});