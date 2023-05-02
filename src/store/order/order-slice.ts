import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApi, patchApi, postApi, putApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";
import { delApi } from "../../utils/api/api";

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

export const holdInvoice = createAsyncThunk(
  "order/holdInvoice",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await postApi("/holdInvoice", payload);
      Toast(response?.message);
      return response;
    } catch (error: any) {
      Toast(error?.message, "error");
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const voidInvoice = createAsyncThunk(
  "order/voidInvoice",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await putApi("/holdInvoice", payload);
      Toast(response?.message);
      return response;
    } catch (error: any) {
      Toast(error?.message, "error");
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await postApi("/order", payload);
      Toast(response?.message);
      return response;
    } catch (error: any) {
      Toast(error?.message, "error");
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const releaseInvoice = createAsyncThunk(
  "order/releaseInvoice",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      let invoiceId = `invoiceId=${payload}`;
      const response = await delApi(`/holdInvoice?${invoiceId}`);
      Toast(response?.message);
      return response;
    } catch (error: any) {
      Toast(error?.message, "error");
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getHoldInvoices = createAsyncThunk(
  "order/getHoldInvoices",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParams = "&perPage=8";
      if (payload?.invoiceNumber) {
        queryParams += `&invoiceNumber=${payload.invoiceNumber}`;
      }
      if (payload?.page) {
        queryParams += `&page=${payload.page}`;
      }
      const response = await getApi(
        `/holdInvoice?storeId=${storeId}${queryParams}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface orderState {
  holdInvoices: any;
  invoiceNumber: any;
  error: string | null;
  status: string;
}

const initialState: orderState = {
  holdInvoices: [],
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
      })
      .addCase(getHoldInvoices.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getHoldInvoices.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.holdInvoices = action?.payload?.data;
      })
      .addCase(getHoldInvoices.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
