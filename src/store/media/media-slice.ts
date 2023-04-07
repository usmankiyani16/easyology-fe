import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../utils/api/api';
import { REQUEST_STATUS } from '../../utils/constants';
import { setLoading } from '../loader/loader-slice';
import { Toast } from '../../components/common/toast/toast';


export const uploadMedia = createAsyncThunk(
    'media',
    async (payload: any, { rejectWithValue }) => {
        try {
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
            console.log('error', error);
            return rejectWithValue(error);
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
                console.log('pend');

                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(uploadMedia.fulfilled, (state, action) => {
                console.log('full', action?.payload?.data);

                state.status = REQUEST_STATUS.SUCCEEDED;
                state.image = action?.payload?.data;
            })
            .addCase(uploadMedia.rejected, (state, action: any) => {
                console.log('action', action.payload?.error);
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
    }
});

export const { } = mediaUploadSlice.actions;

export default mediaUploadSlice.reducer;
