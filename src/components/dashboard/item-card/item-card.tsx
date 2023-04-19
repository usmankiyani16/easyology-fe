import React from 'react';
import './item-card.scss';
import { laptopImg } from '../../../assets/images';

const ItemCard = () => {
  return (
    <div>
      <div className="w-full flex justify-between">
        <label className='text-xl font-semibold  w-2/4'>Items</label>
        <label className='text-xl font-semibold flex justify-center w-1/4'>Qty</label>
        <label className='text-xl font-semibold flex justify-center w-1/4'>Price</label>
      </div>
      <div className="w-full py-2 flex justify-between">
        <div className=' w-2/4'>
          <div className='flex flex-col'>
            <p className='_grey-color'>Product ID #5353</p>
            <div className='flex items-center gap-3'>
              <img className='w-20 h-16 rounded shadow' src={laptopImg} alt='img' />
              <h1 className='font-semibold text-sm'>Laptop Lenovo Series 4</h1>
            </div>
          </div>
        </div>
        <div className=' flex justify-center items-center w-1/4'>2</div>
        <div className=' flex flex-col justify-center items-center w-1/4'>
          <p className='_grey-color'>$ 103.00</p>
          <p className='shadow px-1 rounded'>$ 177.99</p>
        </div>
      </div>

      {/* <table className="w-full">
        <thead >
          <tr className='text-left px-4 py-2'>
            <th className="px-4 py-2 text-xl">Items</th>
            <th className="px-4 py-2 text-xl">Qty</th>
            <th className="px-4 py-2 text-xl">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">
              <div className='flex flex-col'>
                <p className='_grey-color'>Product ID #5353</p>
                <div className='flex items-center gap-3'>
                  <img className='w-20 h-16 rounded shadow' src={laptopImg} alt='img' />
                  <h1 className='font-semibold text-sm'>Laptop Lenovo Series 4</h1>
                </div>
              </div>
            </td>
            <td className="px-4 py-2">2</td>
            <td className="px-4 py-2">
              <p className='_grey-color'>$103</p>
              <p>$177</p>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Item 2</td>
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">$20</td>
          </tr>
        </tbody>
      </table> */}


    </div>
  )
}

export default ItemCard
