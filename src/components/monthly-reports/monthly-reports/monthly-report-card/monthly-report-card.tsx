import { Button, Card } from 'antd'
import React from 'react'

import MonthlyReportData from '../mock-data/monthly-report'
import { ROUTE_CONSTANTS } from '../../../../routes/route-constants'
import { Link } from 'react-router-dom'

const MonthlyReportCard = () => {
  return (
    <div>
       <div className="_acount-reveiveable-card flex flex-col gap-4 mt-4">
        {MonthlyReportData?.map((data: any) => (
          <Card key={data?._id} className="_access-control-card">
            <div className="flex w-full justify-between items-center grid lg:gap-24 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
              <div>
                <div className="flex flex-col gap-4 justify-between">
                  <div className="flex text-lg gap-2">
                    <span className="font-medium whitespace-nowrap">
                      Month:
                    </span>
                    <span className="_grey-color whitespace-nowrap _primary-color">
                      {data?.month}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex text-lg sm:gap-4">
                  <div className="flex  text-lg sm:gap-4 sm:items-center">
                    <span className="_black-color sm:whitespace-nowrap ">
                      Total Sale:
                    </span>
                    <span className="_grey-color whitespace-nowrap ">
                      $ {data?.totalSale}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex text-lg sm:gap-4">
                  <div className="flex  text-lg sm:gap-4 sm:items-center">
                    <span className="_black-color sm:whitespace-nowrap ">
                      Total Profit:
                    </span>
                    <span className="_grey-color whitespace-nowrap ">
                    $ {data?.totalProfit}
                    </span>
                  </div>
                </div>
              </div>

                <Link
                to={{
                  pathname:
                    ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.VIEW_MONTHLY_REPORTS,
                }}
                state={data}
              >
              <div className="flex xs:justify-center xs:mt-2 sm:justify-end items-center ">
                <Button
                  onClick={() => {
                    //   setSignleCustomerData(data);
                    // console.log(data);
                  }}
                >
                  View
                </Button>
              </div>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MonthlyReportCard
