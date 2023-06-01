import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import loaderSlice from "./loader/loader-slice";
import catogarySlice from "./catogaries/catogaries-slice";
import mediaUploadSlice from "./media/media-slice";
import vendorsSlice from "./vendors/vendors-slice";
import purchaseOrderSlice from "./po/po.slice";
import productsSlice from "./products/products-slice";
import orderSlice from "./order/order-slice";
import customersSlice from "./customers/customers.slice";
import expensesSlice from "./expenses/expenses.slice";
import subscriptionSlice from "./admin/subscriptions/subscriptions-slice";
import ordersSlice from "./orders/ordersSlice";
import reportsSlice from "./reports/reportsSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  loader: loaderSlice,
  catogaries: catogarySlice,
  media: mediaUploadSlice,
  vendors: vendorsSlice,
  purchaseOrders: purchaseOrderSlice,
  products: productsSlice,
  order: orderSlice,
  customers: customersSlice,
  expenses: expensesSlice,
  orders: ordersSlice,
  reports: reportsSlice,
  subscriptions: subscriptionSlice,
  // Add your other feature slices here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
