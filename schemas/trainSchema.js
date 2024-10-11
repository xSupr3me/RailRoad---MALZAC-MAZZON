import {z} from "zod";

export const trainSchema = z.object({
    name: z.string().min(1, 'Le nom du train doit contenir au moins 1 caractères.'),
    start_station: z.string().min(1, 'La gare de départ doit contenir au moins 1 caractères.'),
    end_station: z.string().min(1, 'La gare d\'arrivée doit contenir au moins 1 caractères.'),
    time_of_departure: z.string().min(1, 'La gare d\'arrivée doit contenir au moins 1 caractères.'),
    time_of_arrival: z.string().min(1, 'La gare d\'arrivée doit contenir au moins 1 caractères.'),
});