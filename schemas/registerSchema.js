import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email('Email non valide'),

    password: z.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caract res.')
      .refine((pass) => /[A-Z]/.test(pass), 'Le mot de passe doit contenir au moins une lettre majuscule.')
      .refine((pass) => /[a-z]/.test(pass), 'Le mot de passe doit contenir au moins une lettre minuscule.')
      .refine((pass) => /[0-9]/.test(pass), 'Le mot de passe doit contenir au moins un chiffre.')
  });

  