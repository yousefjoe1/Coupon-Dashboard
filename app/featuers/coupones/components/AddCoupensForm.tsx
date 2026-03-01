'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import api from '~/lib/axios'
import { useNotify } from "~/hooks/notify"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { CouponSchema } from "~/validations/coupones"
import type { CouponFormInput } from "~/types/stores.types"

const AddCouponForm = () => {
    const { success, error } = useNotify();
    const queryClient = useQueryClient();

    // جلب المتاجر لعرضها في قائمة اختيار (Dropdown)
    const { data: stores } = useQuery({
        queryKey: ['stores'],
        queryFn: async () => {
            const res = await api.get('/store/all');
            return res.data;
        }
    });

    const form = useForm({
        resolver: zodResolver(CouponSchema),
        defaultValues: {
            code: "",
            discountPct: 0,
            title: "",
            expiryDate: "",
            storeId: "",
        },
    });

    const onSubmit = async (data: CouponFormInput) => {
        try {
            const res = await api.post(`/coupon/create`, data);

            if (res.data.status === 'success' || res.status === 201) {
                success("تمت الإضافة", { description: "تم إضافة الكوبون بنجاح" });
                form.reset();
                queryClient.invalidateQueries({ queryKey: ['coupons'] });
            }
        } catch (err: any) {
            error("خطأ", { description: err.response?.data?.message || "فشل إضافة الكوبون" });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>كود الخصم (Code)</FormLabel>
                                <FormControl><Input placeholder="SAVE50" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discountPct"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>نسبة الخصم</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>عنوان العرض</FormLabel>
                            <FormControl><Input placeholder="خصم 50% على الإلكترونيات" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>تاريخ الانتهاء</FormLabel>
                                <FormControl><Input type="datetime-local" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="storeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>المتجر</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="">اختر متجراً...</option>
                                        {stores?.data?.map((s: any) => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                    {form.formState.isSubmitting ? "جاري الحفظ..." : "إضافة الكوبون"}
                </Button>
            </form>
        </Form>
    );
};

export default AddCouponForm;