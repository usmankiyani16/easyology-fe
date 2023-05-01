import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApi, postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getInvoiceNumber = createAsyncThunk(
  "order/getInvoiceNumber",
  async (payload, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      const response = await getApi(
        `/order/generate-inv-no?storeId=${storeId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } 
  }
);

interface mediaUploadState {
  invoiceNumber: any;
  error: string | null;
  status: string;
}

const initialState: mediaUploadState = {
  invoiceNumber: null,
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvoiceNumber.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getInvoiceNumber.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.invoiceNumber = action?.payload?.data?.invoiceNumber;
      })
      .addCase(getInvoiceNumber.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;