import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import api from '~/lib/axios'
import type { CouponFormInput } from '~/types/stores.types'

const CouponesTable = () => {

    const { data: stores, isLoading, isError } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await api.get('/coupon/all')
            return res.data
        }
    })


    return (
        <div className="mt-12 w-full overflow-x-auto rounded-md border">
            <Table className="min-w-[800px]">
                <TableCaption className="border-t py-4">
                    {isLoading ? (
                        <span className="animate-pulse text-blue-500">جاري تحديث البيانات...</span>
                    ) : isError ? (
                        <span className="text-red-500 font-bold">حدث خطأ أثناء جلب البيانات</span>
                    ) : (
                        `إجمالي المتاجر: ${stores?.data?.length || 0}`
                    )}
                </TableCaption>

                <TableHeader className="bg-muted/50">
                    <TableRow className="text-lg">
                        <TableHead className="w-[150px] text-center">عمليات</TableHead>
                        <TableHead className="text-right">الاسم</TableHead>
                        <TableHead className="text-right">العنوان</TableHead>
                        <TableHead className="max-w-[250px] text-right">التخفيض</TableHead>
                        <TableHead className="w-[100px] text-center">تاريخ الانتهاء</TableHead>
                        <TableHead className="w-[100px] text-center">المتجر</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {stores?.data && stores.data.map((coupon: CouponFormInput) => (
                        <TableRow key={coupon.id} className="text-base hover:bg-muted/30 transition-colors">
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    {/* <Button variant="outline" size="sm">تعديل</Button>
                    <Button variant="destructive" size="sm">حذف</Button> */}
                                </div>
                            </TableCell>

                            <TableCell className="font-bold text-primary">{coupon.code}</TableCell>
                            <TableCell>{coupon.title}</TableCell>
                            <TableCell className="text-right font-bold text-green-600">
                                {coupon.discountPct}%
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {new Date(coupon.expiryDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {coupon.store?.name || "متجر غير معروف"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CouponesTable