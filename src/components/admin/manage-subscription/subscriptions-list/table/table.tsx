import { Button, Empty, Pagination, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  ADMIN_ROUTES,
  ROUTE_CONSTANTS,
} from "../../../../../routes/route-constants";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import Spinner from "../../../../common/spinner/spinner";
import { REQUEST_STATUS } from "../../../../../utils/constants";
import dayjs from "dayjs";
import { getSubscriptions } from "../../../../../store/admin/subscriptions/subscriptions-slice";

interface subscription {
  selectedOption?: any;
}

const SubsciptionTable: React.FC<subscription> = ({ selectedOption }) => {
  const { data, status } = useAppSelector((state) => state.subscriptions);
  let dataSource = data?.subscription?.map((data: any, index: number) => ({
    ...data,
    key: data?._id,
    storeNo: data?.store?.storeNo,
    storeName: data?.store?.name ?? '',
    subscriptionType: data?.subscriptionType,
    subscriptionStatus: data?.status,
    subscriptionStartDate: dayjs(data?.startDate).format("MM/DD/YYYY"),
    subscriptionEndDate: dayjs(data?.endDate).format("MM/DD/YYYY"),
    daysPastDue: data?.pastDue,
    nextPaymentDate: dayjs(data?.endDate).format("MM/DD/YYYY"),
  }));

  console.log(dataSource,'dataSource')

  console.log(data, 'dara')

  const tableColumns = [
    {
      title: "Store ID",
      dataIndex: "storeNo",
      key: "storeNo",
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
        } else if (record?.subscriptionStatus?.toLowerCase() === "canceled") {
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
          record?.subscriptionStatus?.toLowerCase() === "canceled"
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
      render: (_: any, record: any) => (
        <Link
          to={{
            pathname: ROUTE_CONSTANTS.SLASH + ADMIN_ROUTES.VIEW_SUBSCRIPTION,
          }}
          state={record}
        >
          <Button>View</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      {!data?.subscription?.length ? (
        status === REQUEST_STATUS.PENDING ? (
          <Spinner />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Subscriptions available"
          />
        )
      ) : (
        <div className="custom-table-container">
        <Table
        style={{ overflowX: 'auto' }}
          pagination={false}
          dataSource={dataSource}
          columns={tableColumns}
        />
        </div>
      )}
    </>
  );
};

export default SubsciptionTable;
