import { useState } from "react";
import { Button, Col, Empty, Pagination, Row, Select } from "antd";
import SubsciptionTable from "./table/table";
import {
  ADMIN_ROUTES,
  ROUTE_CONSTANTS,
} from "../../../../routes/route-constants";
import { Link } from "react-router-dom";
import { getSubscriptions } from "../../../../store/admin/subscriptions/subscriptions-slice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { useEffect } from "react";
import { REQUEST_STATUS } from "../../../../utils/constants";

const { Option } = Select;

const SubscriptionsList = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.subscriptions);
  const [subscriptionType, setSubscriptionType] = useState<number | null>();
  const [pastDue, setPastDue] = useState<string>();
  const [statusFilter, setFilterStatus] = useState<string>();

  function getSubscriptionsData(data?: any) {
    dispatch(getSubscriptions(data));
  }
  const handlePagination = (value: Number) => {
    if (value) {
      getSubscriptionsData({ page: Number(value) });
    }
  };
  useEffect(() => {
    getSubscriptionsData({ page: 1 });
  }, []);

  const subscriptionChange = (value: number | null) => {
    console.log("value", value);
    setSubscriptionType(value);
    let payload: any = {};
    if (statusFilter) payload.status = statusFilter;
    if (pastDue) payload.pastDue = pastDue;
    if (value) {
      payload.subscriptionType = value;
      getSubscriptionsData(payload);
    } else {
      payload.page = 1;
      getSubscriptionsData(payload);
    }
  };
  const statusChange = (value: string) => {
    console.log("value", value);
    setFilterStatus(value);
    let payload: any = {};
    if (subscriptionType) payload.subscriptionType = subscriptionType;
    if (pastDue) payload.pastDue = pastDue;
    if (value) {
      payload.status = value;
      getSubscriptionsData(payload);
    } else {
      payload.page = 1;
      getSubscriptionsData(payload);
    }
  };
  const pastDueChange = (value: string) => {
    console.log("value", value);
    setPastDue(value);
    let payload: any = {};
    if (subscriptionType) payload.subscriptionType = subscriptionType;
    if (statusFilter) payload.status = statusFilter;
    if (value) {
      payload.pastDue = value;
      getSubscriptionsData(payload);
    } else {
      payload.page = 1;
      getSubscriptionsData(payload);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Row className="flex items-center gap-4 ">
        <Col>
          <h2 className="font-semibold text-xl">Search Subscription</h2>
        </Col>
      </Row>
      <Row className="flex items-center gap-4">
        <Col className="flex flex-col gap-1">
          <label>Subscription Type</label>
          <Select
            
            className="w-[200px]"
            placeholder="Subscription Type"
            onChange={subscriptionChange}
  
          >
            <Option>All</Option>
            <Option value={1}>Monthly</Option>
            <Option value={6}>6 Months</Option>
            <Option value={12}>12 Months</Option>
            <Option value={24}>24 Months</Option>
          </Select>
        </Col>
        <Col className="flex flex-col gap-1">
        <label>Subscription Past</label>
          <Select
            className="w-[200px]"
            placeholder="Past Due"
            onChange={pastDueChange}
          >
            <Option>All</Option>
            <Option value="30">30 days past due</Option>
            <Option value="45">45 days past due</Option>
            <Option value="60">60 days past due</Option>
            <Option value="90">90 days past due</Option>
            <Option value="90+">More than 90 days past due</Option>
          </Select>
        </Col>
        <Col className="flex flex-col gap-1">
        <label>Subscription Status</label>
          <Select
            className="w-[200px]"
            placeholder="Status"
            onChange={statusChange}
          >
            <Option>All</Option>
            <Option value="Active">Active</Option>
            <Option value="Suspended">Suspended</Option>
            <Option value="Cancelled">Canceled</Option>
            <Option value="Call Back">Call Back</Option>
            <Option value="Inactive">Inactive</Option>
            <Option value="Pending For Approval">Pending</Option>
          </Select>
        </Col>
        <Col className="ml-auto">
          <Link to={ROUTE_CONSTANTS.SLASH + ADMIN_ROUTES.ADD_SUBSCRIPTION}>
            <Button className="_primary-button">Add Subscription</Button>
          </Link>
        </Col>
      </Row>
      <SubsciptionTable />
      {/* {data?.subscription?.length ? ( */}
      <Pagination
        onChange={handlePagination}
        className="flex justify-end mt-4"
        defaultCurrent={data?.pagination?.page}
        defaultPageSize={8}
        total={data?.pagination?.totalCount}
        showSizeChanger={false}
      />
      {/* ) : (
        ""
      )} */}
    </div>
  );
};

export default SubscriptionsList;
