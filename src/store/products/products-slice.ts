import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApi, postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getProducts = createAsyncThunk(
  "products/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParam;
      const response = await getApi(`/product?storeId=${storeId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface productState {
  products: any | null;
  error: string | null;
  status: string;
}

const initialState: productState = {
  products: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.products = action?.payload?.data;
      })
      .addCase(getProducts.rejected, (state, action: any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
