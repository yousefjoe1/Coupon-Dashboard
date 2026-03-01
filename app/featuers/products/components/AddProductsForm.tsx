'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import api from '~/lib/axios'
import { useNotify } from "~/hooks/notify"
import { useQueryClient } from "@tanstack/react-query"
import { ProductSchema, type ProductFormData } from "~/validations/stores"
import { useState } from "react"

type Files = FileList | null


const AddProductForm = () => {
    const { success, error } = useNotify();
    const queryClient = useQueryClient();

    const [file, setFile] = useState<Files>(null)


    const form = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            link: "",
            category: "Trending",
        },
    });

    const onSubmit = async (data: ProductFormData) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price.toString());
            formData.append("description", data.description);
            formData.append("link", data.link);
            formData.append("category", data.category);

            if (file) {
                formData.append("image", file[0]);
            }

            const res = await api.post(`/products/create`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.status === 'success' || res.status === 201) {
                success("تمت الإضافة", { description: `تم إضافة ${data.name} بنجاح` });
                form.reset();
                queryClient.invalidateQueries({ queryKey: ['products'] });
            }
        } catch (err: any) {
            error("خطأ", { description: "فشل في إضافة المنتج" });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>اسم المنتج</FormLabel>
                                <FormControl><Input placeholder="iPhone 15 Pro" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>السعر ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={value ?? ""}
                                        onChange={(e) => onChange(e.target.valueAsNumber)}
                                        {...fieldProps}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>القسم (Category)</FormLabel>
                                <FormControl><Input placeholder="Electronics" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>صورة المنتج</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>

                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>رابط الشراء</FormLabel>
                            <FormControl><Input placeholder="https://amazon.com/..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>الوصف</FormLabel>
                            <FormControl>
                                <Input placeholder="وصف موجز للمنتج..." {...field} />
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
                    {form.formState.isSubmitting ? "جاري الحفظ..." : "إضافة المنتج"}
                </Button>
            </form>
        </Form>
    );
};

export default AddProductForm;