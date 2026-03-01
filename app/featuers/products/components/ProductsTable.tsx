
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import api from '~/lib/axios'

const ProductsTable = () => {

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await api.get('/products/all')
            return res.data
        }
    })


    return (
        <div className="mt-12 w-full overflow-x-auto rounded-md border">
            <Table className="min-w-[900px]">
                <TableCaption>
                    {isLoading ? "جاري التحميل..." : "قائمة المنتجات"}
                </TableCaption>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[150px] text-center">عمليات</TableHead>
                        <TableHead className="w-[100px] text-center">الصورة</TableHead>
                        <TableHead className="text-right">المنتج</TableHead>
                        <TableHead className="text-right">الرابط</TableHead>
                        <TableHead className="text-right">القسم</TableHead>
                        <TableHead className="text-right">السعر</TableHead>
                        <TableHead className="max-w-[200px] text-right">الوصف</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.data?.map((product: any) => (
                        <TableRow key={product.id}>
                            <TableCell className="text-center">
                                <div className="flex justify-center gap-2">
                                    {/* <Button variant="outline" size="sm">تعديل</Button>
                            <Button variant="destructive" size="sm">حذف</Button> */}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="h-12 w-12 rounded border overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="font-bold">
                                <a href={product.name} target="_blank" className="hover:text-blue-500 underline-offset-4 hover:underline">
                                    {product.name}
                                </a>
                            </TableCell>
                            <TableCell className="font-bold">
                                <a href={product.link} target="_blank" className="hover:text-blue-500 underline-offset-4 hover:underline">
                                    {product.link}
                                </a>
                            </TableCell>
                            <TableCell>
                                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                                    {product.category}
                                </span>
                            </TableCell>
                            <TableCell className="font-mono text-green-600 font-bold">
                                ${product.price.toLocaleString()}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                                {product.description}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProductsTable