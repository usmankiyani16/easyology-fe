

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi, putApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";



export const getReports = createAsyncThunk(
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
    reports: any | null;
    error: string | null;
    status: string;
  
  }
  const initialState: OrdersState = {
    reports:[],
    error: null,
    status: REQUEST_STATUS.IDLE,
   
  };
  const reportsSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getReports.pending, (state, action) => {
          state.status = REQUEST_STATUS.PENDING;
        })
        .addCase(getReports.fulfilled, (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
          state.reports = action?.payload?.data;
        })
        .addCase(getReports.rejected, (state, action: any) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload?.error;
        })
    },
  });

  export const {} = reportsSlice.actions;

export default reportsSlice.reducer;