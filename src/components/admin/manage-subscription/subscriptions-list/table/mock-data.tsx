import { Button } from "antd";

export const tableColumns = [
  {
    title: "Store ID",
    dataIndex: "storeId",
    key: "storeId",
  },
  {
    title: "Store Name",
    dataIndex: "storeName",
    key: "storeName",
  },
  {
    title: "Subscription Type",
    dataIndex: "subscriptionType",
    key: "subscriptionType",
  },
  {
    title: "Subscription Status",
    dataIndex: "subscriptionStatus",
    key: "subscriptionStatus",
  },
  {
    title: "Subscription Start Date",
    dataIndex: "subscriptionStartDate",
    key: "subscriptionStartDate",
  },
  {
    title: "Subscription End Date",
    dataIndex: "subscriptionEndDate",
    key: "subscriptionEndDate",
  },
  {
    title: "Days Past Due",
    dataIndex: "DaysPastDue",
    key: "DaysPastDue",
  },
  {
    title: "Next Payment Date",
    dataIndex: "NextPaymentDate",
    key: "NextPaymentDate",
  },
  {
    render: (text: any) => <Button>View</Button>,
  },
];
export const dataSource = [
  {
    key: "1",
    storeId: "5785",
    storeName: "Wall Mart",
    subscriptionType: "6 Months",
    subscriptionStatus: "Active",
    subscriptionStartDate: "01-24-2023",
    subscriptionEndDate: "05-24-2023",
    DaysPastDue: "0",
    NextPaymentDate: "06-25-2023",
  },
  {
    key: "2",
    storeId: "5786",
    storeName: "Wall Mart",
    subscriptionType: "6 Months",
    subscriptionStatus: "Suspended",
    subscriptionStartDate: "01-24-2023",
    subscriptionEndDate: "01-30-2023",
    DaysPastDue: "7",
    NextPaymentDate: "06-25-2023",
  },
];
