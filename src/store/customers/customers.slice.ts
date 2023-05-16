import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getCustomers = createAsyncThunk(
  "customers/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
    //   user?page=1&perPage=10&storeId=64516ecc0ac43ae06073f802
      const response = await getApi(`/user?page=1&perPage=10&storeId=${storeId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customers/add",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      payload.userId = data?._id;
      payload.storeId = data?.storeId;
      const response = await postApi("/add-customer", payload);
      Toast(response?.message);
      return response;
    } catch (error: any) {
      Toast(error?.response?.data?.error, "error");
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface CustomersState {
  customers: any | null;
  error: string | null;
  status: string;
}

const initialState: CustomersState = {
  customers: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.customers = action?.payload?.data;
      })
      .addCase(getCustomers.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      })
      .addCase(addCustomer.pending, (state) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        let vendor = {
          name: action?.payload?.data?.name,
          _id: action?.payload?.data?._id,
        };
        state.customers?.push(vendor);
      })
      .addCase(addCustomer.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = customersSlice.actions;

export default customersSlice.reducer;