import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getCustomers = createAsyncThunk(
  "customers/get",
  async (payload:any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParams = "";
      if (payload?.search) {
        queryParams += `&search=${payload.search}`;
      }
      if (payload?.page) {
        queryParams += `&page=${payload.page}`;
      }
      if (payload?.perPage) {
        queryParams += `&perPage=${payload.perPage}`;
      }
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
      payload.storeId = data?.storeId;
      const response = await postApi("/user/register", payload);
      Toast(response?.message);
      return response;
    } catch (error: any) {
      Toast(error?.response?.data?.message, "error");
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
      })
      .addCase(addCustomer.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = customersSlice.actions;

export default customersSlice.reducer;
