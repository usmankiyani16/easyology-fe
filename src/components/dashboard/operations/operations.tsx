import React from 'react'
import './operations.scss';
import { Button } from 'antd';

const Operations = () => {
    return (
        <div className='_operations flex justify-between w-full mt-10'>
            <div className='flex flex-col gap-10 w-9/12'>
                <div className='flex gap-5'>
                    <Button className='w-32 flex items-center justify-center'>Void Invoice</Button>
                    <Button className='w-32 flex items-center justify-center'>No Sale</Button>
                    <Button className='w-32 flex items-center justify-center'>Hold Invoice</Button>
                </div>
                <div className='flex gap-5'>
                    <Button className='w-32 flex items-center justify-center'>Cash Pay</Button>
                    <Button className='w-32 flex items-center justify-center'>Ach Pay</Button>
                    <Button className='w-32 flex items-center justify-center'>Credit Card</Button>
                </div>
            </div>
            <div className='w-3/12 pr-5 flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <label>Sub-Total </label>
                    <label>$ 24</label>
                </div>
                <div className='flex justify-between'>
                    <label>Discount </label>
                    <label className='shadow rounded pl-4 pr-1'>$ -5</label>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <label className='_grey-color'>Sales Tax </label>
                        <label>(8.5%) </label>
                    </div>
                    <label>$ 67</label>
                </div>
                <div className='flex justify-between'>
                    <label className='_primary-color'>Total </label>
                    <label>$ 354</label>
                </div>

            </div>
        </div>
    )
}

export default Operations