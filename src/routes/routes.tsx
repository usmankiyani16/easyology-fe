import { Spin } from "antd";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/login/login";
import NotFound from "../components/auth/not-found/not-found";
import RequireAuth from "../components/auth/RequireAuth";
import Unauthorized from "../components/auth/unauthorized/unauthorized";
import CashChecker from "../components/cash-checker/cash-checker";
import DailyLedger from "../components/access-control/access-control";
import Reports from "../components/reports/reports";
import Notification from "../components/notification/notification";
import Payments from "../components/orders/orders";
import AddPO from "../components/purchase-order/addpo";
import PurchaseOrder from "../components/purchase-order/purchase-order";
import Settings from "../components/expenses/expenses";
import Support from "../components/support/support";
import MainLayout from "../layout/layout";
import { UserRole } from "../utils/interfaces";
import { ADMIN_ROUTES, ROUTE_CONSTANTS } from "./route-constants";



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
const ViewCustomerLazy = Loadable(
  lazy(() => import("../pages/customer/view-customers/index"))
);
const ViewAllInvoicesLazy = Loadable(
  lazy(() => import("../pages/customer/view-all-invoices/index"))
);

const ORDERSLazy = Loadable(lazy(() => import("../pages/orders/index")));
const CREATEORDERLazy = Loadable(lazy(() => import("../pages/orders/create-order/index")))
const VIEWORDERSLazy = Loadable(
  lazy(() => import("../pages/orders/view-orders/index"))
);
const CONVERTTOINVOICELazy = Loadable(lazy(() => import("../pages/orders/convert-to-invoice")))

const ExpensesLazy = Loadable(lazy(() => import("../pages/expenses/index")));
const AllExpensesLazy = Loadable(lazy(() => import("../pages/all-expenses/index")));
const AddExpensesLazy = Loadable(lazy(() => import("../pages/add-expense/index")));



const MonthlyReportsLazy = Loadable(
  lazy(() => import("../pages/reports/index"))
);
const AcountsReceiveableLazy = Loadable(
  lazy(() => import("../pages/reports/acount-receiveable/index"))
);
const ViewAcountReceiveableLazy = Loadable(
  lazy(() => import("../pages/reports/acount-receiveable/view-receiveable/index"))
);
const ViewAcountPayableLazy = Loadable(
  lazy(() => import("../pages/reports/acount-receiveable/view-receiveable/index"))
);
const AcountsPayableLazy = Loadable(
  lazy(() => import("../pages/reports/acount-payable/index"))
);
const MonthlyReportLazy = Loadable(
  lazy(() => import("../pages/reports/monthly-reports/index"))
);
const ViewMonthlyReportLazy = Loadable(
  lazy(() => import("../pages/reports/view-monthly-reports/index"))
);
const AccessControlLazy = Loadable(
  lazy(() => import("../pages/access-control/index"))
);
const AddEmployeeLazy = Loadable(
  lazy(() => import("../pages/access-control/add-employee/index"))
);
const EditAccessLazy = Loadable(
  lazy(() => import("../pages/access-control/edit-access/index"))
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
const AddSubscriptionLazy = Loadable(
  lazy(
    () => import("../pages/admin/manage-subscription/add-subscription/index")
  )
);
const SubscriptionsListLazy = Loadable(
  lazy(
    () => import("../pages/admin/manage-subscription/subscriptions-list/index")
  )
);

const ViewSubscriptionLazy = Loadable(
  lazy(
    () =>
      import(
        "../pages/admin/manage-subscription/subscriptions-list/view-subscription/index"
      )
  )
);

const RecentInvoicesLazy = Loadable(
  lazy(() => import("../pages/recent-invoices/index"))
);

const { role }: any = JSON.parse(localStorage.getItem(UserRole.USER) || "{}");
let path = "";
if (role === UserRole.SUPER_ADMIN) {
  path = "/admin/dashboard";
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
            <ViewAllInvoicesLazy />
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
        path: ROUTE_CONSTANTS.ACCESS_CONTROL,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <AccessControlLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.ADD_EMPLOYEEE,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <AddEmployeeLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.EDIT_ACCESS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <EditAccessLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.REPORTS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <MonthlyReportsLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.VIEW_MONTHLY_REPORTS,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ViewMonthlyReportLazy />
          </RequireAuth>
        ),
      },
      {

        path: ROUTE_CONSTANTS.ACOUNT_RECEIVEABLE,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <AcountsReceiveableLazy/>
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.VIEW_ACOUNT_RECEIVEABLE,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ViewAcountReceiveableLazy/>
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.VIEW_ACOUNT_PAYABLE,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ViewAcountPayableLazy/>
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.ACOUNT_PAYABLE,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <AcountsPayableLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.MONTHLY_REPORT,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <MonthlyReportLazy />
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
        path: ROUTE_CONSTANTS.CREATE_ORDER,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <CREATEORDERLazy />
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
        path: ROUTE_CONSTANTS.CONVERT_TO_INVOICE,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <CONVERTTOINVOICELazy />
          </RequireAuth>
        ),
      },


      {
        path: ROUTE_CONSTANTS.EXPENSES,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <ExpensesLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.ALL_EXPENSES,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <AllExpensesLazy />
          </RequireAuth>
        ),
      },
      {
        path: ROUTE_CONSTANTS.ADD_EXPENSE,
        element: (
          <RequireAuth
            allowedRoles={[UserRole.USER, UserRole.ADMIN, "wholesaler"]}
          >
            <AddExpensesLazy />
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
      {
        path: ADMIN_ROUTES.ADMIN_DASHBOARD,
        element: (
          <RequireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
            <AdminDashboardLazy />
          </RequireAuth>
        ),
      },
      {
        path: ADMIN_ROUTES.SUBSCRIPTIONS_LIST,
        element: (
          <RequireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
            <SubscriptionsListLazy />
          </RequireAuth>
        ),
      },
      // ViewSubscriptionLazy
      {
        path: ADMIN_ROUTES.VIEW_SUBSCRIPTION,
        element: (
          <RequireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
            <ViewSubscriptionLazy />
          </RequireAuth>
        ),
      },
      {
        path: ADMIN_ROUTES.ADD_SUBSCRIPTION,
        element: (
          <RequireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
            <AddSubscriptionLazy />
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
