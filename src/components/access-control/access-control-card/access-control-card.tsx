import { Button, Card } from "antd";
import AccessControl from "../mock-data/access-mock-data";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";
import { Link } from "react-router-dom";

const AccessControlCard = () => {
  return (
    <div>
      <div className="_access-control-card flex flex-col gap-4">
        {AccessControl?.map((data: any) => (
          <Card key={data?._id} className="_access-control-card">
            <div className="flex w-full justify-between items-center grid lg:gap-24 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
              <div>
                <div className="flex flex-col gap-4 justify-between">
                  <div className="flex text-lg gap-2">
                    <span className="font-medium whitespace-nowrap">
                      Employeee Name:
                    </span>
                    <span className="_grey-color">
                      {data?.employeeName}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex text-lg sm:gap-4">
                  <div className="flex  text-lg sm:gap-4 sm:items-center">
                    <span className="_black-color sm:whitespace-nowrap ">
                      Username:
                    </span>
                    <span className="_grey-color whitespace-nowrap ">
                    {data?.userName}
                    </span>
                  </div>
                </div>
              </div>

                 <Link
                to={{
                  pathname:
                    ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.EDIT_ACCESS,
                }}
                // state={data}
              >
              <div className="flex xs:justify-center xs:mt-2 sm:justify-end items-center ">
                <Button
                className="_primary-color"
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
  );
};

export default AccessControlCard;
