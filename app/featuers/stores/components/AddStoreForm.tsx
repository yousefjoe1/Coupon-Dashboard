'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import api from '~/lib/axios'
import { useNotify } from "~/hooks/notify"
import { StoreSchema, type StoreFormData } from "~/validations/stores"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

type Files = FileList | null

const AddStoreForm = () => {
    const { success, error } = useNotify();
    const queryClient = useQueryClient()
    const [file, setFile] = useState<Files>(null)

    const form = useForm<StoreFormData>({
        resolver: zodResolver(StoreSchema),
        defaultValues: {
            name: "",
            websiteUrl: "",
            description: "",
        },
    });

    const onSubmit = async (data: StoreFormData) => {
        if (!file) {
            error('يرجى إرفاق صورة المتجر')
            return
        }
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("websiteUrl", data.websiteUrl);
            formData.append("description", data.description || "");
            if (file) {
                formData.append("image", file[0]);
            }
            const res = await api.post(`/store/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.status === 'success' || res.status === 200) {
                success("تمت الإضافة بنجاح", { description: `تم إضافة متجر ${data.name}` });

                form.reset({
                    name: "",
                    websiteUrl: "",
                    description: "",
                });
                queryClient.invalidateQueries({ queryKey: ['stores'] })

                setFile(null)
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "فشل في إضافة المتجر";
            error("خطأ", { description: errorMessage });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm max-w-[90%]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>اسم المتجر</FormLabel>
                                <FormControl>
                                    <Input placeholder="مثال: أمازون" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>لوجو المتجر</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files)}
                                        {...fieldProps}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>رابط المتجر (Website)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://amazon.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>وصف المتجر</FormLabel>
                            <FormControl>
                                {/* غيرت الـ Input لـ Textarea عشان الوصف بيبقى طويل عادة */}
                                <Input placeholder="اكتب نبذة عن المتجر هنا..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full md:w-auto px-10 font-bold"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "جاري الحفظ..." : "إضافة المتجر"}
                </Button>
            </form>
        </Form>
    );
};

export default AddStoreForm