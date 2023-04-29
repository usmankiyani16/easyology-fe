import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApi, postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";

export const getProducts = createAsyncThunk(
  "products/get",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
      const storeId = data?.storeId;
      let queryParams = '';
      if (payload?.name) {
        queryParams += `&name=${payload.name}`;
      }
      if (payload?.categoryId) {
        queryParams += `&categoryId=${payload.categoryId}`;
      }
      if (payload?.subCategoryId) {
        queryParams += `&subCategoryId=${payload.subCategoryId}`;
      }
      if (payload?.page) {
        queryParams += `&page=${payload.page}`;
      }
      if (payload?.perPage) {
        queryParams += `&perPage=${payload.perPage}`;
      }
      const response = await getApi(`/product?storeId=${storeId}${queryParams}`);
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
  badgeCount: any
}

const initialState: productState = {
  products: [],
  error: null,
  status: REQUEST_STATUS.IDLE,
  badgeCount: []
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBadgeCount(state, action) {
      console.log(action);
      state.badgeCount = action?.payload
    }
  },
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

export const { setBadgeCount } = productsSlice.actions;

export default productsSlice.reducer;
