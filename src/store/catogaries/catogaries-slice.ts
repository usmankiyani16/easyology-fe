import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../utils/api/api';
import { REQUEST_STATUS } from '../../utils/constants';
import { setLoading } from '../loader/loader-slice';
import { Toast } from '../../components/common/toast/toast';


export const getCatogaries = createAsyncThunk(
    'catogaries',
    async (payload, { rejectWithValue }) => {
        try {
            const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = data?._id
            console.log('usesrid', userId)
            const response = await getApi('/category/' + userId);
            console.log('response.data', response)
            return response;
        } catch (error) {
            console.log('error', error);
            return rejectWithValue(error);
        }
    }
);




interface CatogariesState {
    catogaries: string[] | null;
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
            .addCase(getCatogaries.pending, (state, action) => {
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
    }
});

export const { } = catogariesSlice.actions;

export default catogariesSlice.reducer;
