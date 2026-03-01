import React from 'react'
import AddStoreForm from '~/featuers/stores/components/AddStoreForm'
import StoresTable from '~/featuers/stores/components/StoresTable'

const Stores = () => {
    return (
        <div className='space-y-6 p-3'>
            <AddStoreForm />

            <StoresTable />
        </div>
    )
}

export default Stores