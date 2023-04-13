import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';
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
            const response = await getApi(`/category?userId=${userId}`);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getSubCatogaries = createAsyncThunk(
    'catogaries/getSubCategories',
    async (payload: any, { rejectWithValue }) => {
        try {
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = data?._id
            const response = await getApi(`/subcategory/?categoryId=${payload}`);
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
            Toast(error?.response?.data?.error, 'error')
            return rejectWithValue(error);
        } finally {
            dispatch(setLoading(false))
        }
    }
);

export const addSubCatogary = createAsyncThunk(
    'catogaries/addSubCatogary',
    async (payload: any, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setLoading(true))
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            payload.userId = data?._id
            const response = await postApi('/subcategory', payload);
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




interface CatogariesState {
    catogaries: any | null;
    subCategories: any,
    error: string | null;
    status: string
}


const initialState: CatogariesState = {
    catogaries: [],
    subCategories: [],
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
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(getCatogaries.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;
                state.catogaries = action?.payload?.data;
            })
            .addCase(getCatogaries.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
            .addCase(getSubCatogaries.pending, (state) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(getSubCatogaries.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;
                state.subCategories = action?.payload?.data;
            })
            .addCase(getSubCatogaries.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
            .addCase(addCatogary.pending, (state) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(addCatogary.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;
                let category = {
                    name: action?.payload?.data?.name,
                    _id: action?.payload?.data?._id
                }
                state.catogaries?.push(category);
            })
            .addCase(addCatogary.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
            .addCase(addSubCatogary.pending, (state) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(addSubCatogary.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;

            })
            .addCase(addSubCatogary.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
    }
});

export const { } = catogariesSlice.actions;

export default catogariesSlice.reducer;
