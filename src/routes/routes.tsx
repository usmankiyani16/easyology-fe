import { Navigate } from "react-router-dom";
import Login from "../components/auth/login/login";
import CashChecker from "../components/cash-checker/cash-checker";
import DailyLedger from "../components/daily-ledger/daily-ledger";
import Dashboard from "../components/dashboard/dashboard";
import History from "../components/history/history";
import MonthlyReports from "../components/monthly-reports/monthly-reports";
import Notification from "../components/notification/notification";
import Payments from "../components/payments/payments";
import PurchaseOrder from "../components/purchase-order/purchase-order";
import Settings from "../components/settings/settings";
import Support from "../components/support/support";
import MainLayout from "../layout/layout";
import { ROUTE_CONSTANTS } from "./route-constants";

export const routes: any = [
  {
    path: ROUTE_CONSTANTS.SLASH,
    element: <Navigate to={ROUTE_CONSTANTS.DASHBOARD} />,
  },
  { path: ROUTE_CONSTANTS.LOGIN, element: <Login /> },
  {
    path: ROUTE_CONSTANTS.SLASH,
    element: <MainLayout />,
    children: [
      { path: ROUTE_CONSTANTS.DASHBOARD, element: <Dashboard /> },
      { path: ROUTE_CONSTANTS.HISTORY, element: <History /> },
      { path: ROUTE_CONSTANTS.CASH_CHECKER, element: <CashChecker /> },
      { path: ROUTE_CONSTANTS.DAILY_LEDGER, element: <DailyLedger /> },
      { path: ROUTE_CONSTANTS.MONTHLY_REPORTS, element: <MonthlyReports /> },
      { path: ROUTE_CONSTANTS.NOTIFICATION, element: <Notification /> },
      { path: ROUTE_CONSTANTS.PAYMENTS, element: <Payments /> },
      { path: ROUTE_CONSTANTS.PURCHASE_ORDER, element: <PurchaseOrder /> },
      { path: ROUTE_CONSTANTS.SETTINGS, element: <Settings /> },
      { path: ROUTE_CONSTANTS.SUPPORT, element: <Support /> },
    ],
  },
  // {
  //   path: ROUTE_CONSTANTS.DASHBOARD,
  //   element: <MainLayout children={<Dashboard />} />,
  // },
  ,
];
