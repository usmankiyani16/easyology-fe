import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getVendors = createAsyncThunk(
  "vendors/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      const response = await getApi(`/vendor?storeId=${storeId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addVendor = createAsyncThunk(
  "vendors/add",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      payload.userId = data?._id;
      payload.storeId = data?.storeId;
      const response = await postApi("/vendor", payload);
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

interface VendorsState {
  vendors: any | null;
  error: string | null;
  status: string;
}

const initialState: VendorsState = {
  vendors: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVendors.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.vendors = action?.payload?.data;
      })
      .addCase(getVendors.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      })
      .addCase(addVendor.pending, (state) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        let vendor = {
          name: action?.payload?.data?.name,
          _id: action?.payload?.data?._id,
        };
        state.vendors?.push(vendor);
      })
      .addCase(addVendor.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = vendorsSlice.actions;

export default vendorsSlice.reducer;
