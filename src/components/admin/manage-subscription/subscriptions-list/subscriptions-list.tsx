import { Button, Col, Row, Select } from "antd";
import SubsciptionTable from "./table/table";
import {
  ADMIN_ROUTES,
  ROUTE_CONSTANTS,
} from "../../../../routes/route-constants";
import { Link } from "react-router-dom";
const { Option } = Select;

const SubscriptionsList = () => {
  return (
    <div className="flex flex-col gap-4">
      <Row className="flex items-center gap-4 ">
        <Col>
          <h2 className="font-semibold">Search Subscription</h2>
        </Col>
        <Col>
          <Select className="w-[200px]" placeholder="Subscription Type">
            <Option value="monthly">Monthly</Option>
            <Option value="6months">6 Months</Option>
            <Option value="12months">12 Months</Option>
            <Option value="24months">24 Months</Option>
          </Select>
        </Col>
        <Col>
          <Select className="w-[200px]" placeholder="Past Due">
            <Option value="30">30 days past due</Option>
            <Option value="45">45 days past due</Option>
            <Option value="60">60 days past due</Option>
            <Option value="90">90 days past due</Option>
            <Option value="90+">More than 90 days past due</Option>
          </Select>
        </Col>
        <Col>
          <Select className="w-[200px]" placeholder="Status">
            <Option value="active">Active</Option>
            <Option value="suspended">Suspended</Option>
            <Option value="canceled">Canceled</Option>
            <Option value="callback">Call Back</Option>
            <Option value="pending">Pending</Option>
          </Select>
        </Col>
        <Col className="ml-auto">
          <Link to={ROUTE_CONSTANTS.SLASH + ADMIN_ROUTES.ADD_SUBSCRIPTION}>
            <Button className="_primary-button">Add Subscription</Button>
          </Link>
        </Col>
      </Row>
      <SubsciptionTable />
    </div>
  );
};

export default SubscriptionsList;
