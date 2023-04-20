import React, { Dispatch, SetStateAction } from 'react';
import './item-card.scss';
import { laptopImg } from '../../../assets/images';
interface ItemCardProps {
  products: any[];
  setProducts: Dispatch<SetStateAction<any[]>>;
}
const ItemCard: React.FC<ItemCardProps> = ({ products, setProducts }) => {
  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter((product: { _id: string; }) => product._id !== productId);
    setProducts(updatedProducts);
  };
  return (
    <div>
      <div className="w-full flex justify-between">
        <label className='text-xl font-semibold  w-2/4'>Items</label>
        <label className='text-xl font-semibold flex justify-center w-1/4'>Qty</label>
        <label className='text-xl font-semibold flex  w-1/4'>Price</label>
      </div>
      <div className='h-[202px] overflow-auto _custom-scrollbar'>
        {products?.map((item, index) => (
          <div key={index} className="w-full py-2 flex justify-between">
            <div className=' w-2/4'>
              <div className='flex flex-col'>
                <p className='_grey-color'>{item?._id}</p>
                <div className='flex items-center gap-3'>
                  <img className='w-20 h-16 rounded shadow' src={item?.image} alt='img' />
                  <h1 className='font-semibold text-sm'>{item?.name}</h1>
                </div>
              </div>
            </div>
            <div className=' flex justify-center items-center w-1/4'>{item?.qty}</div>
            <div className=' flex justify-between items-center w-1/4'>
              <div>
                <p className='_grey-color'>$ 103.00</p>
                <p className='shadow px-1 rounded'>$ {item?.price}</p>
              </div>
              <div className='flex items-center mr-3'>delete</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemCard
