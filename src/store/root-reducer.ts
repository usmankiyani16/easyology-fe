import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import loaderSlice from "./loader/loader-slice";
import catogarySlice from "./catogaries/catogaries-slice";
import mediaUploadSlice from "./media/media-slice";
import vendorsSlice from "./vendors/vendors-slice";
import purchaseOrderSlice from "./po/po.slice";
import productsSlice from "./products/products-slice";
import orderSlice from "./order/order-slice";
const rootReducer = combineReducers({
  auth: authSlice,
  loader: loaderSlice,
  catogaries: catogarySlice,
  media: mediaUploadSlice,
  vendors: vendorsSlice,
  purchaseOrders: purchaseOrderSlice,
  products: productsSlice,
  order: orderSlice,
  // Add your other feature slices here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
