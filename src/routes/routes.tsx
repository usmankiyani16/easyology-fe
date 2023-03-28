import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/login/login";
import NotFound from "../components/auth/not-found/not-found";
import RequireAuth from "../components/auth/RequireAuth";
import CashChecker from "../components/cash-checker/cash-checker";
import DailyLedger from "../components/daily-ledger/daily-ledger";
import MonthlyReports from "../components/monthly-reports/monthly-reports";
import Notification from "../components/notification/notification";
import Payments from "../components/payments/payments";
import PurchaseOrder from "../components/purchase-order/purchase-order";
import Settings from "../components/settings/settings";
import Support from "../components/support/support";
import MainLayout from "../layout/layout";
import { ROUTE_CONSTANTS } from "./route-constants";

//<img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense
      fallback={
        <div
          className="d-flex justify-center align-center"
          style={{ height: "80vh" }}
        >
          Loading . . .{" "}
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

const DashboardLazy = Loadable(lazy(() => import("../pages/dashboard/index")));
const HistoryLazy = Loadable(lazy(() => import("../pages/history/index")));
const AdminDashboardLazy = Loadable(
  lazy(() => import("../pages/admin/dashboard/index"))
);

const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");
let path = "";
if (role === "admin") {
  path = "/admin-dashboard";
} else if (role === "user") {
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
          <RequireAuth allowedRoles={["user"]}>
            <DashboardLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.HISTORY,
        element: (
          <RequireAuth allowedRoles={["user"]}>
            <HistoryLazy />
          </RequireAuth>
        ),
      },
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
  {
    path: "*",
    element: <NotFound />,
  },
  ,
];
