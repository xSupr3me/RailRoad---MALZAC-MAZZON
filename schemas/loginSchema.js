import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email('Email non valide'),
    password: z.string().min(1, 'Aucun mot de passe fourni'),
});