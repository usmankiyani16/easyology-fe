import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../utils/api/api';
import { REQUEST_STATUS } from '../../utils/constants';
import { setLoading } from '../loader/loader-slice';
import { Toast } from '../../components/common/toast/toast';


export const uploadMedia = createAsyncThunk(
    'media',
    async (payload: any, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setLoading(true));
            const file = new FormData();
            file.append('file', payload);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response = await postApi('/media/upload', file, config);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
);




interface mediaUploadState {
    image: any;
    error: string | null;
    status: string
}


const initialState: mediaUploadState = {
    image: null,
    error: null,
    status: REQUEST_STATUS.IDLE
};

const mediaUploadSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadMedia.pending, (state, action) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(uploadMedia.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;
                state.image = action?.payload?.data;
            })
            .addCase(uploadMedia.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
    }
});

export const { } = mediaUploadSlice.actions;

export default mediaUploadSlice.reducer;
