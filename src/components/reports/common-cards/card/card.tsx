import { Button, Card, Empty } from "antd";
import React from "react";
import AccessControl from "../../../access-control/mock-data/access-mock-data";
import ReceiveableMockData from "./mock-data";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../../routes/route-constants";
import { REQUEST_STATUS } from "../../../../utils/constants";
import Spinner from "../../../common/spinner/spinner";
import { useLocation } from "react-router-dom";

const Cards: React.FC<any> = ({ label1, label2, label3, data, status }) => {
  console.log(data, "bbu");

  const {pathname} = useLocation()
  console.log( 'PathName' ,pathname)

  return (
    <div>
      <div className="flex flex-col gap-4 mt-3">
        {status === REQUEST_STATUS.PENDING ? <Spinner /> : ""}
        {!data?.length && status === REQUEST_STATUS.SUCCEEDED ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No product available"
          />
        ) : (
          status !== REQUEST_STATUS.PENDING &&
          data?.map((data: any) => (
            <Card key={data?._id} className="_access-control-card">
              <div className="flex w-full justify-between items-center grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
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
                        Total no of {label2}:
                      </span>
                      <span className="_grey-color whitespace-nowrap ">
                        {data?.totalCount}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex text-lg sm:gap-4">
                    <div className="flex  text-lg sm:gap-4 sm:items-center">
                      <span className="_black-color sm:whitespace-nowrap ">
                        Total Amount:
                      </span>
                      <span className="_grey-color whitespace-nowrap ">
                        $ {data?.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to={{
                    pathname:
                      ROUTE_CONSTANTS.SLASH +
                      ROUTE_CONSTANTS.VIEW_ACOUNT,
                  }}
                  state={{ data, label1, label2, label3 , pathname }}
                  
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
          ))
        )}
      </div>
    </div>
  );
};

export default Cards;
