import {
  checkCashIcon,
  accessControlIcon,
  dashboardIcon,
  customerIcon,
  ReportIcon,
  notificationIcon,
  orderIcon,
  productsIcon,
  purchaseOrderIcon,
  expensesIcon,
  supportIcon,
} from "../../assets/icons";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";
import "./sidebar.scss";

export const sidebarData = [
  {
    key: 0,
    icon: <img className="w-7" src={dashboardIcon} alt="dashboard" />,
    label: "Dashboard",
    path: ROUTE_CONSTANTS.DASHBOARD,
  },
  {
    key: 1,
    icon: <img className="w-7" src={productsIcon} alt="dashboard" />,
    label: "Products",
    path: ROUTE_CONSTANTS.PRODUCTS,
  },
  {
    key: 2,
    icon: (
      <img className="w-7" src={purchaseOrderIcon} alt="purchaseOrderIcon" />
    ),
    label: "Purchase Order",
    path: ROUTE_CONSTANTS.PURCHASE_ORDER,
  },
  {
    key: 3,
    icon: <img className="w-7" src={customerIcon} alt="cutomerIcon" />,
    label: "Customers",
    path: ROUTE_CONSTANTS.CUSTOMER,
  },
  {
    key: 4,
    icon: <img className="w-7" src={orderIcon} alt="paymentsIcon" />,
    label: "Orders",
    path: ROUTE_CONSTANTS.ORDERS,
  },

  // {
  //   key: 5,
  //   icon: <img className="w-7" src={checkCashIcon} alt="checkCashIcon" />,
  //   label: "Check Cashing",
  //   path: ROUTE_CONSTANTS.CASH_CHECKER,
  // },
  {
    key: 6,
    icon: <img className="w-7" src={expensesIcon} alt="expensesIcon" />,
    label: "Expenses",
    path: ROUTE_CONSTANTS.EXPENSES,
  },
  // {
  //   key: 7,
  //   icon: (
  //     <img className="w-7" src={ReportIcon} alt="ReportIcon" />
  //   ),
  //   label: "Reports",
  //   path: ROUTE_CONSTANTS.MONTHLY_REPORTS,
  // },
  // {
  //   key: 8,
  //   icon: <img className="w-7" src={accessControlIcon} alt="accessControlIcon" />,
  //   label: "Access Control",
  //   path: ROUTE_CONSTANTS.ACCESS_CONTROL,
  // },
  // {
  //   key: 9,
  //   icon: <img className="w-7" src={notificationIcon} alt="notificationIcon" />,
  //   label: "Notification",
  //   path: ROUTE_CONSTANTS.NOTIFICATION,
  // },
  // {
  //   key: 10,
  //   icon: <img className="w-7" src={supportIcon} alt="supportIcon" />,
  //   label: "Support",
  //   path: ROUTE_CONSTANTS.SUPPORT,
  // },
];
