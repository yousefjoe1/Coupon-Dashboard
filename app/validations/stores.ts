import * as z from "zod";

export const StoreSchema = z.object({
    name: z.string().min(2, "اسم المتجر يجب أن يكون حرفين على الأقل"),
    // تعديل لوجو لقبول ملف
    logo: z.any().refine((file) => file?.length !== 0, "اللوجو مطلوب"),
    websiteUrl: z.string().url("يجب إدخال رابط صحيح للموقع"),
    description: z.string().optional().or(z.literal('')),
});

export type StoreFormData = z.infer<typeof StoreSchema>;




export const ProductSchema = z.object({
    name: z.string().min(2, "اسم المنتج مطلوب"),
    price: z.number().min(0.01, "السعر يجب أن يكون أكبر من 0"),
    description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
    link: z.string().or(z.literal('')),
    category: z.string().min(1, "القسم مطلوب"),
});

export type ProductFormData = z.infer<typeof ProductSchema>;