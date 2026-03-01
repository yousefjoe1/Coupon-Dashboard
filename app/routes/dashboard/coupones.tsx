import AddCouponForm from '~/featuers/coupones/components/AddCoupensForm'
import CouponesTable from '~/featuers/coupones/components/CouponesTable'

const Coupones = () => {
    return (
        <div className='space-y-6 p-3'>

            <AddCouponForm />

            <CouponesTable />

        </div>
    )
}

export default Coupones