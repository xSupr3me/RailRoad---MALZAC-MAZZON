// Shéma d'enregistrement de l'utilisateur avec gestion des erreurs
import { z } from 'zod';

export const registerSchema = z.object({

    username: z.string().min(3, 'Le nom d utilisateur doit contenir au moins 3 caracteres.'),

    email: z.string().email('Email non valide'),
    
    password: z.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caract res.')
      .refine((pass) => /[A-Z]/.test(pass), 'Le mot de passe doit contenir au moins une lettre majuscule.')
      .refine((pass) => /[a-z]/.test(pass), 'Le mot de passe doit contenir au moins une lettre minuscule.')
      .refine((pass) => /[0-9]/.test(pass), 'Le mot de passe doit contenir au moins un chiffre.')
  });

  