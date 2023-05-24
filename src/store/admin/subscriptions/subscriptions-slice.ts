import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Toast } from "../../../components/common/toast/toast";
import { getApi, postApi } from "../../../utils/api/api";
import { setLoading } from "../../loader/loader-slice";
import { REQUEST_STATUS } from "../../../utils/constants";

export const getSubscriptions = createAsyncThunk(
  "vendors/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await getApi(`/subscription`);
    
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addSubscription = createAsyncThunk(
  "subscriptions/add",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      // payload.userId = data?._id;
      // payload.storeId = data?.storeId;
      const response = await postApi("/subscription", payload);
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

interface subscriptionState {
  data: any;
  error: string | null;
  status: string;
}

const initialState: subscriptionState = {
  data: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptions.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action?.payload?.data;
      })
      .addCase(getSubscriptions.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      })
      .addCase(addSubscription.pending, (state) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
      })
      .addCase(addSubscription.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
