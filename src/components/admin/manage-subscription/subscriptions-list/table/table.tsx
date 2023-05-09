import { Button, Table, Tag } from "antd";
import React from "react";

const SubsciptionTable = () => {
  const tableColumns = [
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
      render: (_: any, record: any) => {
        let color = "";

        if (record?.subscriptionStatus?.toLowerCase() === "active") {
          color = "#176e14";
        } else if (record?.subscriptionStatus?.toLowerCase() === "suspended") {
          color = "#f56d3b";
        } else if (record?.subscriptionStatus?.toLowerCase() === "cancel") {
          color = "#eb3434";
        } else if (record?.subscriptionStatus?.toLowerCase() === "callback") {
          color = "#575659";
        } else if (record?.subscriptionStatus?.toLowerCase() === "pending") {
          color = "#ebb734";
        }
        return (
          <Tag color={color} key={record?._id}>
            {record?.subscriptionStatus?.toUpperCase()}
          </Tag>
        );
      },
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
      render: (_: any, record: any) => {
        let color = "";

        if (
          record?.subscriptionStatus?.toLowerCase() === "suspended" ||
          record?.subscriptionStatus?.toLowerCase() === "cancel"
        ) {
          color = "red";
        }

        return <span style={{ color }}>{record?.subscriptionEndDate}</span>;
      },
    },
    {
      title: "Days Past Due",
      dataIndex: "daysPastDue",
      key: "daysPastDue",
      render: (_: any, record: any) => {

        return (
          <span style={{ color: record?.daysPastDue > 0 ? "red" : "" }}>
            {record?.daysPastDue}
          </span>
        );
      },
    },
    {
      title: "Next Payment Date",
      dataIndex: "nextPaymentDate",
      key: "nextPaymentDate",
    },
    {
      render: (text: any) => <Button>View</Button>,
    },
  ];
  const dataSource = [
    {
      key: "1",
      storeId: "5785",
      storeName: "Wall Mart",
      subscriptionType: "6 Months",
      subscriptionStatus: "Active",
      subscriptionStartDate: "01-24-2023",
      subscriptionEndDate: "05-24-2023",
      daysPastDue: "0",
      nextPaymentDate: "06-25-2023",
    },
    {
      key: "2",
      storeId: "5786",
      storeName: "Wall Mart",
      subscriptionType: "6 Months",
      subscriptionStatus: "Suspended",
      subscriptionStartDate: "01-24-2023",
      subscriptionEndDate: "01-30-2023",
      daysPastDue: "7",
      nextPaymentDate: "06-25-2023",
    },
    {
      key: "2",
      storeId: "5786",
      storeName: "Wall Mart",
      subscriptionType: "6 Months",
      subscriptionStatus: "Cancel",
      subscriptionStartDate: "01-24-2023",
      subscriptionEndDate: "01-30-2023",
      daysPastDue: "7",
      nextPaymentDate: "06-25-2023",
    },
    {
      key: "2",
      storeId: "5786",
      storeName: "Wall Mart",
      subscriptionType: "6 Months",
      subscriptionStatus: "Callback",
      subscriptionStartDate: "01-24-2023",
      subscriptionEndDate: "01-30-2023",
      daysPastDue: "0",
      nextPaymentDate: "06-25-2023",
    },
    {
      key: "2",
      storeId: "5786",
      storeName: "Wall Mart",
      subscriptionType: "6 Months",
      subscriptionStatus: "Pending",
      subscriptionStartDate: "01-24-2023",
      subscriptionEndDate: "01-30-2023",
      daysPastDue: "0",
      nextPaymentDate: "06-25-2023",
    },
  ];
  return <Table pagination={false} dataSource={dataSource} columns={tableColumns} />;
};

export default SubsciptionTable;
