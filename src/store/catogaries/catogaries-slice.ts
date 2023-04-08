import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../utils/api/api';
import { REQUEST_STATUS } from '../../utils/constants';
import { setLoading } from '../loader/loader-slice';
import { Toast } from '../../components/common/toast/toast';


export const getCatogaries = createAsyncThunk(
    'catogaries/get',
    async (payload, { rejectWithValue }) => {
        try {
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = data?._id
            const response = await getApi('/category/' + userId);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

type AddCatogaryPayload = {
    name: string,
    userId: string,
    image?: string
}
export const addCatogary = createAsyncThunk(
    'catogaries/add',
    async (payload: AddCatogaryPayload, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setLoading(true))
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            payload.userId = data?._id
            const response = await postApi('/category', payload);
            Toast(response?.message)
            return response;
        } catch (error: any) {
            Toast(error?.response?.data?.message, 'error')
            return rejectWithValue(error);
        } finally {
            dispatch(setLoading(false))
        }
    }
);




interface CatogariesState {
    catogaries: any | null;
    error: string | null;
    status: string
}


const initialState: CatogariesState = {
    catogaries: [],
    error: null,
    status: REQUEST_STATUS.IDLE
};

const catogariesSlice = createSlice({
    name: 'catogaries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCatogaries.pending, (state) => {
                console.log('pend');

                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(getCatogaries.fulfilled, (state, action) => {
                console.log('full', action);

                state.status = REQUEST_STATUS.SUCCEEDED;
                state.catogaries = action?.payload?.data;
            })
            .addCase(getCatogaries.rejected, (state, action: any) => {
                console.log('action', action.payload?.error);
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
            .addCase(addCatogary.pending, (state) => {
                console.log('pend');

                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(addCatogary.fulfilled, (state, action) => {
                console.log('full', action?.payload?.data);

                state.status = REQUEST_STATUS.SUCCEEDED;
                let category = {
                    name: action?.payload?.data?.name,
                    _id: action?.payload?.data?._id
                }
                state.catogaries?.push(category);
            })
            .addCase(addCatogary.rejected, (state, action: any) => {
                console.log('action', action.payload);
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
    }
});

export const { } = catogariesSlice.actions;

export default catogariesSlice.reducer;
