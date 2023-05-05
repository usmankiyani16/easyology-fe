import { Button, Card } from 'antd'
import React from 'react'

const ViewOrderCard = () => {
  return (
    <div>


       
<div className="flex flex-col gap-4 mt-3">
       
          <Card>
            <div className="flex w-full justify-between items-center grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
              <div className="flex flex-col gap-12 justify-between">
                <div className="flex text-lg sm:gap-4">
                  <span className="font-medium">Order ID:</span>
                  <span className="_primary-color font-semibold">
                    # 12
                  </span>
                </div>

               
              </div>
              <div className="flex flex-col justify-center text-lg sm:gap-4">
                <div className="flex  text-lg sm:gap-4 sm:items-center justify-end">
                  <span className="_black-color sm:whitespace-nowrap">
                    x2
                  </span>
                 
                </div>
            
              </div>

              <div className="flex justify-end">
                $ 1599
              </div>
              <div className="flex justify-end">
                3000
              </div>

             
               
             
            </div>
          </Card>
 
      </div>

            
      
    </div>
 )
  }


export default ViewOrderCard