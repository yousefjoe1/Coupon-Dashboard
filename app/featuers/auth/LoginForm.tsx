'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { LoginFormData, LoginResponse } from '~/types/auth.types'
import { LoginSchema } from '~/validations/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import api from '~/lib/axios'
import { useNotify } from "~/hooks/notify"
import { useNavigate } from "react-router"


interface User {
    restUser: {};
    token: string;
}

const LoginForm = () => {

    const router = useNavigate()

    const { success, error } = useNotify()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "admin@coupon.com",
            password: "admin123",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await api.post(`/users/login`, data)
            const response = res.data
            if (response.status == 'success') {
                success(response.message)
                localStorage.setItem('user-token', response.data.token);
                localStorage.setItem('user-info', JSON.stringify(response.data.restUser));
                router('/dashboard', { replace: true })
            } else {
                error(response.message || `Error in login`)
            }
        } catch (err) {
            console.error("Login error", err)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* حقل البريد الإلكتروني */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@mail.com"
                                    type="email"
                                    className="text-left"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* حقل كلمة المرور */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>كلمة المرور</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="••••••••"
                                    type="password"
                                    className="text-left"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full font-bold py-6 text-lg"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "جاري التحميل..." : "تسجيل الدخول"}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm