import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, "يرجى إدخال البريد الإلكتروني")
        .email("البريد الإلكتروني غير صحيح"),
    password: z
        .string()
        .min(1, "يرجى إدخال كلمة المرور"),
});
