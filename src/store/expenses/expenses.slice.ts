import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getExpenses = createAsyncThunk(
  "expenses/get",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParams = "";
      if (payload?.month) {
        queryParams += `&month=${payload.month}`;
      }
      if (payload?.startDate) {
        queryParams += `&startDate=${payload.startDate}`;
      }
      if (payload?.endDate) {
        queryParams += `&endDate=${payload.endDate}`;
      }
      if (payload?.page) {
        queryParams += `&page=${payload.page}`;
      }
      if (payload?.perPage) {
        queryParams += `&perPage=${payload.perPage}`;
      } else {
        queryParams += "&perPage=8";
      }
     

      const response = await getApi(
        `/expense?storeId=${storeId}${queryParams}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addExpense = createAsyncThunk(
  "expenses/add",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      payload.userId = data?._id;
      payload.storeId = data?.storeId;
      const response = await postApi("/expense", payload);
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

interface ExpensesState {
  data: any | null;
  error: string | null;
  status: string;
}

const initialState: ExpensesState = {
  data: {},
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state, action) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action?.payload?.data;
      })
      .addCase(getExpenses.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      })
      .addCase(addExpense.pending, (state) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
      })
      .addCase(addExpense.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = expensesSlice.actions;

export default expensesSlice.reducer;
