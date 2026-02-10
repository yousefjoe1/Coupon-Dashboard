import { toast } from "sonner";

// تعريف الواجهة للخيارات الإضافية (اختياري)
interface NotifyOptions {
    description?: string;
    duration?: number;
}

export const useNotify = () => {
    /**
     * إشعار النجاح
     * @param title - العنوان الرئيسي
     * @param options - وصف إضافي أو مدة مخصصة
     */
    const success = (title: string, options?: NotifyOptions) => {
        toast.success(title, {
            description: options?.description || "",
            duration: options?.duration || 3000,
            // richColors مفعله تلقائياً لو ضفتها في الـ Toaster
        });
    };

    /**
     * إشعار الخطأ
     * @param title - العنوان الرئيسي
     * @param options - وصف الخطأ أو مدة مخصصة
     */
    const error = (title: string, options?: NotifyOptions) => {
        toast.error(title, {
            description: options?.description || "Something went wrong, please try again.",
            duration: options?.duration || 5000,
        });
    };

    /**
     * إشعار التحذير (إضافة مفيدة لداشبورد الكوبونات)
     */
    const warn = (title: string, options?: NotifyOptions) => {
        toast.warning(title, {
            description: options?.description,
            duration: 4000,
        });
    };

    // إرجاع الدوال لاستخدامها في المكونات
    return { success, error, warn };
};