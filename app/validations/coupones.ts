import * as z from "zod";

export const CouponSchema = z.object({
    code: z.string().min(3, "الكود يجب أن يكون 3 أحرف على الأقل"),
    discountPct: z.number().min(1).max(100),
    title: z.string().min(5, "العنوان يجب أن يكون وصفياً"),
    expiryDate: z.string().min(1, "تاريخ الانتهاء مطلوب"),
    storeId: z.string().uuid("يرجى اختيار متجر صحيح"),
});
