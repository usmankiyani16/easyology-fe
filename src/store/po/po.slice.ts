import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../utils/api/api';
import { REQUEST_STATUS } from '../../utils/constants';
import { setLoading } from '../loader/loader-slice';
import { Toast } from '../../components/common/toast/toast';


export const getPOS = createAsyncThunk(
    'purchaseOrders/get',
    async (payload, { rejectWithValue }) => {
        try {
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = data?._id
            const response = await getApi(`/vendor-product?userId=${userId}&page=1&perPage=10`);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
type AddVendorPayload = {
    name: string,
    email: string,
    companyName: string,
    comapnyAddress: string,
    phoneNumber: string,
    userId?: string
}
export const addPO = createAsyncThunk(
    'purchaseOrders/add',
    async (payload: any, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setLoading(true))
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            payload.userId = data?._id
            const response = await postApi('/product/single-po', payload);
            Toast(response?.message)
            return response;
        } catch (error: any) {
            Toast(error?.response?.data?.error, 'error')
            return rejectWithValue(error);
        } finally {
            dispatch(setLoading(false))
        }
    }
);

export const addPOinBulk = createAsyncThunk(
    'purchaseOrders/addPoInBulk',
    async (payload: any, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setLoading(true))
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            payload.userId = data?._id
            const response = await postApi('/product/bulk-po', payload);
            Toast(response?.message)
            return response;
        } catch (error: any) {
            Toast(error?.response?.data?.error, 'error')
            return rejectWithValue(error);
        } finally {
            dispatch(setLoading(false))
        }
    }
);




interface purchaseOrderState {
    purchaseOrders: any | null;
    error: string | null;
    status: string,
    importModalOpen: boolean
}


const initialState: purchaseOrderState = {
    purchaseOrders: [],
    error: null,
    status: REQUEST_STATUS.IDLE,
    importModalOpen: false
};

const purchaseOrdersSlice = createSlice({
    name: 'purchaseOrders',
    initialState,
    reducers: {
        setImportModalOpen(state, action) {
            state.importModalOpen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPOS.pending, (state, action) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(getPOS.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;
                state.purchaseOrders = action?.payload?.data;
            })
            .addCase(getPOS.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
            .addCase(addPO.pending, (state) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(addPO.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;
                // let po = {
                //     name: action?.payload?.data?.name,
                //     _id: action?.payload?.data?._id
                // }
                // state.purchaseOrders?.push(po);
            })
            .addCase(addPO.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
    }
});

export const { setImportModalOpen } = purchaseOrdersSlice.actions;

export default purchaseOrdersSlice.reducer;
