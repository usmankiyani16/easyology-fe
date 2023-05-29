import { Button, Input, Select } from "antd";
import addEmployessIcon from "../../../assets/icons/layout/add-employees.png";

import { SearchOutlined } from "@ant-design/icons";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";
import { Link } from "react-router-dom";

const AccessControlHeader = () => {
  const { Option } = Select;
  const searchCustomer = (event: any) => {
    console.log(event, "d");
  };
  return (
    <div>
      <div className="flex xs:flex-col xs:gap-4 md:gap-0 md:flex-row items-center md:justify-between mt-3">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-lato  text-[2rem]">Access Control</h1>
        </div>

        <div>
          <Input
            className="w-44 h-8"
            prefix={<SearchOutlined />}
            placeholder="Search Customer"
            onChange={searchCustomer}
          />
        </div>
        <div>
          <Select
            className="w-[200px]"
            placeholder="Search category by"
            // onChange={pastDueChange}
          >
            <Option value="name">Name</Option>
            <Option value="userName">Username</Option>
            <Option value="hireDate">Hire Date</Option>
            <Option value="title">Title</Option>
            <Option value="terminationDate">More than 90 days past due</Option>
          </Select>
        </div>

        <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.ADD_EMPLOYEEE}>
        <div>
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}
          <Button className="_bg-white-color _primary-color _border-primary-color _white-color _hover font-medium mt-4 flex justify-between items-center gap-6 cursor-pointer">
            <img src={addEmployessIcon} alt="addEmployessIcon" />
            Add Employees
          </Button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default AccessControlHeader;
