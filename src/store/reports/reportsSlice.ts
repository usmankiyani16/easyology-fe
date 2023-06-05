import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi, putApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getReportsReceviveable = createAsyncThunk(
  "receiveable/get",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParam = "";
      if (payload?.month) {
        queryParam += `&month=${payload.month}`;
      }
      if (payload?.page) {
        queryParam = `&page=${payload?.page}`;
      }
      const response = await getApi(
        `/order/receivable-invoices?storeId=${storeId}${queryParam}&perPage=8`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getReportsPayable = createAsyncThunk(
  "payable/get",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParam = "";
      if (payload?.page) {
        queryParam = `&page=${payload.page}`;
      }
      const response = await getApi(
        `/Vendor-Product/payable-invoices?storeId=${storeId}${queryParam}&perPage=8`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface ReportsReceiveableState {
  reportsReceiveable: any | null;
  error: string | null;
  status: string;
}
const receiveableInitialState: ReportsReceiveableState = {
  reportsReceiveable: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
};
interface ReportsPayableState {
  reportsPayable: any | null;
  error: string | null;
  status: string;
}

const payableInitialStates: ReportsPayableState = {
  reportsPayable: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const reportsReceiveableSlice = createSlice({
  name: "reportsReceiveable",
  initialState: receiveableInitialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportsReceviveable.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getReportsReceviveable.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.reportsReceiveable = action?.payload?.data;
      })
      .addCase(getReportsReceviveable.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

const reportsPayableSlice = createSlice({
  name: "reportsPayable",
  initialState: payableInitialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getReportsReceviveable.pending, (state, action) => {
      state.status = REQUEST_STATUS.PENDING;
    })
    .addCase(getReportsReceviveable.fulfilled, (state, action) => {
      state.status = REQUEST_STATUS.SUCCEEDED;
      state.reportsPayable = action?.payload?.data;
    })
    .addCase(getReportsReceviveable.rejected, (state, action: any) => {
      state.status = REQUEST_STATUS.FAILED;
      state.error = action.payload?.error;
    });
  },
});

export const {} = reportsReceiveableSlice.actions;

export default reportsReceiveableSlice.reducer;
