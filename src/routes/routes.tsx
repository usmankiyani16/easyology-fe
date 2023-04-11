import { Spin } from "antd";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/login/login";
import NotFound from "../components/auth/not-found/not-found";
import RequireAuth from "../components/auth/RequireAuth";
import Unauthorized from "../components/auth/unauthorized/unauthorized";
import CashChecker from "../components/cash-checker/cash-checker";
import DailyLedger from "../components/daily-ledger/daily-ledger";
import MonthlyReports from "../components/monthly-reports/monthly-reports";
import Notification from "../components/notification/notification";
import Payments from "../components/payments/payments";
import AddPO from "../components/purchase-order/addpo";
import PurchaseOrder from "../components/purchase-order/purchase-order";
import Settings from "../components/settings/settings";
import Support from "../components/support/support";
import MainLayout from "../layout/layout";
import { UserRole } from "../utils/interfaces";
import { ROUTE_CONSTANTS } from "./route-constants";

//<img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
(
  <Suspense
    fallback={
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);

const DashboardLazy = Loadable(lazy(() => import("../pages/dashboard/index")));
const PurchaseOrderLazy = Loadable(
  lazy(() => import("../pages/purchase-order/index"))
);

const HistoryLazy = Loadable(lazy(() => import("../pages/history/index")));
const PaymentsLazy = Loadable(lazy(() => import("../pages/payments/index")));
const SettingsLazy = Loadable(lazy(() => import("../pages/settings/index")));
const MonthlyReportsLazy = Loadable(
  lazy(() => import("../pages/monthly-reports/index"))
);
const DailyLedgerLazy = Loadable(
  lazy(() => import("../pages/daily-ledger/index"))
);
const CashCheckLazy = Loadable(
  lazy(() => import("../pages/cash-checker/index"))
);
const NotificatiosLazy = Loadable(
  lazy(() => import("../pages/notifications/index"))
);
const SupportLazy = Loadable(lazy(() => import("../pages/support/index")));

const AdminDashboardLazy = Loadable(
  lazy(() => import("../pages/admin/dashboard/index"))
);

const RecentInvoicesLazy = Loadable(
  lazy(() => import("../pages/recent-invoices/index"))
);

const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");
let path = "";
if (role === UserRole.ADMIN) {
  path = "/admin-dashboard";
} else {
  path = "/dashboard";
}

// eslint-disable-next-line no-sparse-arrays
export const routes: any = [
  {
    path: ROUTE_CONSTANTS.SLASH,
    element: <Navigate to={path} />,
  },
  { path: ROUTE_CONSTANTS.LOGIN, element: <Login /> },
  {
    path: ROUTE_CONSTANTS.ADMIN_DASHBOARD,
    element: (
      <RequireAuth allowedRoles={["admin"]}>
        <AdminDashboardLazy />
      </RequireAuth>
    ),
  },
  {
    path: ROUTE_CONSTANTS.SLASH,
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_CONSTANTS.DASHBOARD,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <DashboardLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.HISTORY,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <HistoryLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.PURCHASE_ORDER,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <PurchaseOrderLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.CASH_CHECKER,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <CashCheckLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.DAILY_LEDGER,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <DailyLedgerLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.MONTHLY_REPORTS,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <MonthlyReportsLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.NOTIFICATION,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <NotificatiosLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.PAYMENTS,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <PaymentsLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.SETTINGS,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <SettingsLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.SUPPORT,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <SupportLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.ADD_PURCHASE_ORDER,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <AddPO />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.RECENT_INVOICES,
        element: (
          <RequireAuth allowedRoles={["user", "admin", "wholesaler"]}>
            <RecentInvoicesLazy />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: ROUTE_CONSTANTS.UNAUTHORIZED,
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  ,
];
