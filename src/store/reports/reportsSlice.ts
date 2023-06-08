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

      if (payload?.startDate) {
        queryParam += `&startDate=${payload.startDate}`;
      }
      if (payload?.endDate) {
        queryParam += `&endDate=${payload.endDate}`;
      }
      if (payload?.page) {
        queryParam += `&page=${payload?.page}`;
      }
      if (payload?.perPage) {
        queryParam += `&perPage=${payload.perPage}`;
      } else {
        queryParam += "&perPage=8";
      }

      const response = await getApi(
        `/order/receivable-invoices?storeId=${storeId}${queryParam}`
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
      if (payload?.month) {
        queryParam += `&month=${payload.month}`;
      }
      if (payload?.startDate) {
        queryParam += `&startDate=${payload.startDate}`;
      }
      if (payload?.endDate) {
        queryParam += `&endDate=${payload.endDate}`;
      }
      if (payload?.page) {
        queryParam += `&page=${payload?.page}`;
      }
      if (payload?.perPage) {
        queryParam += `&perPage=${payload.perPage}`;
      } else {
        queryParam += "&perPage=8";
      }
      const response = await getApi(
        `/Vendor-Product/payable-invoices?storeId=${storeId}${queryParam}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getReportsMonthly = createAsyncThunk(
  "reportsMonthly/get",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParam = "";
      if (payload?.month) {
        queryParam += `&month=${payload.month}`;
      }
      if (payload?.startDate) {
        queryParam += `&startDate=${payload.startDate}`;
      }
      if (payload?.endDate) {
        queryParam += `&endDate=${payload.endDate}`;
      }
      if (payload?.page) {
        queryParam += `&page=${payload?.page}`;
      }
      if (payload?.perPage) {
        queryParam += `&perPage=${payload.perPage}`;
      } else {
        queryParam += "&perPage=8";
      }
      const response = await getApi(
        `/Vendor-Product/payable-invoices?storeId=${storeId}${queryParam}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface ReportsState {
  data: any;
  error: string | null;
  status: string;
}
const initialState: ReportsState = {
  data: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportsReceviveable.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getReportsReceviveable.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action?.payload?.data;
      })
      .addCase(getReportsReceviveable.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      })
      .addCase(getReportsPayable.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getReportsPayable.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action?.payload?.data;
      })
      .addCase(getReportsPayable.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = reportsSlice.actions;

export default reportsSlice.reducer;
