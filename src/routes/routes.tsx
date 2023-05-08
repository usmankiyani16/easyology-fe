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
import Payments from "../components/orders/orders";
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
const ProductsLazy = Loadable(lazy(() => import("../pages/products/index")));
const PurchaseOrderLazy = Loadable(
  lazy(() => import("../pages/purchase-order/index"))
);

const CustomerLazy = Loadable(lazy(() => import("../pages/customer/index")));
const ViewCustomerLazy = Loadable(lazy(() => import("../pages/customer/view-customers/index")));
const ViewAllInvoicesLazy = Loadable(lazy(() => import("../pages/customer/view-all-invoices/index")));

const ORDERSLazy = Loadable(lazy(() => import("../pages/orders/index")));
const VIEWORDERSLazy = Loadable(lazy(() => import("../pages/orders/view-orders/index")));
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

const { role }: any = JSON.parse(localStorage.getItem(UserRole.USER) || "{}");
let path = "";
if (role === UserRole.SUPER_ADMIN) {
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
      <RequireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
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
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <DashboardLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.PRODUCTS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ProductsLazy />
          </RequireAuth>
        ),
      },
     
      {
        path: ROUTE_CONSTANTS.PURCHASE_ORDER,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <PurchaseOrderLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.CUSTOMER,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <CustomerLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.VIEW_CUSTOMERS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ViewCustomerLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.VIEW_ALL_INVOICES,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ViewAllInvoicesLazy/>
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.CASH_CHECKER,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <CashCheckLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.DAILY_LEDGER,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <DailyLedgerLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.MONTHLY_REPORTS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <MonthlyReportsLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.NOTIFICATION,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <NotificatiosLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.ORDERS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ORDERSLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.VIEW_ORDERS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <VIEWORDERSLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.SETTINGS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <SettingsLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.SUPPORT,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <SupportLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.ADD_PURCHASE_ORDER,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <AddPO />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.RECENT_INVOICES,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
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
