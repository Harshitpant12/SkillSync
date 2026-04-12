import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(4, "Name must be at least 4 characters")
        .max(15, "Name must be at most 15 characters")
        .regex(/^[a-zA-Z]+$/, "Username can contain only letters"),
    email: z
        .email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character")
})

export const loginSchema = z.object({
    email: z
        .email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character")
})