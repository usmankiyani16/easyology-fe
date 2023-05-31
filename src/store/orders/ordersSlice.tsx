import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi, putApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getOrders = createAsyncThunk(
  "orders/get",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParam = "";
      if (payload?.page) {
        queryParam = `&page=${payload?.page}`;
      }
      const response = await getApi(
        `/order?storeId=${storeId}${queryParam}&perPage=8`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface OrdersState {
  orders: any | null;
  error: string | null;
  status: string;

}
const initialState: OrdersState = {
  orders:[],
  error: null,
  status: REQUEST_STATUS.IDLE,
 
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.orders = action?.payload?.data;
      })
      .addCase(getOrders.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      })
  },
});

export const {} = ordersSlice.actions;

export default ordersSlice.reducer;
