import { z } from 'zod';

export const updateSchema = z.object({
    username: z.string().min(3, "Username must have at least 3 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .optional(),
    role: z.enum(['user', 'admin']).optional() // On va gérer cela autrement
});