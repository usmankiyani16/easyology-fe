import React from 'react';
import './item-card.scss';
import { laptopImg } from '../../../assets/images';

const ItemCard = () => {
  return (
    <div>

      <table className="w-full">
        <thead >
          <tr className='text-left px-4 py-2'>
            <th className="px-4 py-2">Items</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Price</th>
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
            <td className="px-4 py-2">$10</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Item 2</td>
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">$20</td>
          </tr>
        </tbody>
      </table>


    </div>
  )
}

export default ItemCard
