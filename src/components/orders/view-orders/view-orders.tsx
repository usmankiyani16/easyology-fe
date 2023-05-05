import { Button } from 'antd'
import React from 'react'
import ViewOrderCard from './view-order-card/view-order-card'

const ViewOrders = () => {
  return (
    <div>

      <div className="flex justify-between sm:items-center mt-3">
        <div>
          {" "}
          <h1 className="font-lato  mt-4 text-[2rem]">Orders</h1>
        </div>

        <div className="flex justify-between items-center xs:flex-col sm:flex-row sm:gap-12">
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}

          <div>
            <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
              Convert to Invoice
            </Button>
          </div>
        </div>
      </div>


     
      <div>
        <span>Customer Name:</span>
        <span> Ali Raza</span>
      </div>
      <div className='flex w-full justify-between items-center grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1'>
        <div >
        <span>Contact Number:</span>
        <span> +9248338383</span>
        </div>

       {/*  <div className='flex justify-between'>
          <span>QTY</span>
          <span>Price</span>
        </div> */}
        

      </div>
     


       <div className='_view-order'>
        <ViewOrderCard/>
       </div>

      
    </div>
  )
}

export default ViewOrders
