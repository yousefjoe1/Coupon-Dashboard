import React from 'react'
import AddProductsForm from '~/featuers/products/components/AddProductsForm'
import ProductsTable from '~/featuers/products/components/ProductsTable'

const Products = () => {
    return (
        <div className="space-y-6 p-3">
            <AddProductsForm />
            <ProductsTable />
        </div>
    )
}

export default Products