import {
  checkCashIcon,
  dailyLedgerIcon,
  dashboardIcon,
  historyIcon,
  monthlyReportIcon,
  notificationIcon,
  paymentsIcon,
  productsIcon,
  purchaseOrderIcon,
  settingsIcon,
  supportIcon,

} from "../../assets/icons";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";
import './sidebar.scss'

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
    icon: <img className="w-7" src={historyIcon} alt="cutomerIcon" />,
    label: "Customers",
    path: ROUTE_CONSTANTS.CUSTOMER,
  },
  {
    key: 4,
    icon: <img className="w-7" src={paymentsIcon} alt="paymentsIcon" />,
    label: "Orders",
    path: ROUTE_CONSTANTS.ORDERS,
  },
  {
    key: 5,
    icon: <img className="w-7" src={settingsIcon} alt="settingsIcon" />,
    label: "Settings",
    path: ROUTE_CONSTANTS.SETTINGS,
  },
  {
    key: 6,
    icon: (
      <img className="w-7" src={monthlyReportIcon} alt="monthlyReportIcon" />
    ),
    label: "Monthly Report",
    path: ROUTE_CONSTANTS.MONTHLY_REPORTS,
  },
  {
    key: 7,
    icon: <img className="w-7" src={dailyLedgerIcon} alt="dailyLedgerIcon" />,
    label: "Daily Ledger",
    path: ROUTE_CONSTANTS.DAILY_LEDGER,
  },
  {
    key: 8,
    icon: <img className="w-7" src={checkCashIcon} alt="checkCashIcon" />,
    label: "Check Cash",
    path: ROUTE_CONSTANTS.CASH_CHECKER,
  },
  {
    key: 9,
    icon: <img className="w-7" src={notificationIcon} alt="notificationIcon" />,
    label: "Notification",
    path: ROUTE_CONSTANTS.NOTIFICATION,
  },
  {
    key: 10,
    icon: <img className="w-7" src={supportIcon} alt="supportIcon" />,
    label: "Support",
    path: ROUTE_CONSTANTS.SUPPORT,
  },
];
