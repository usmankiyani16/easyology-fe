import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postApi } from '../../utils/api/api';
import { REQUEST_STATUS } from '../../utils/constants';
import { setLoading } from '../loader/loader-slice';
import { Toast } from '../../components/common/toast/toast';

type SigninPayload = {
    email: string;
    password: string;
};
export const signin = createAsyncThunk(
    'auth/signin',
    async (payload: SigninPayload, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await postApi('/user/sign-in', payload);
            let obj = {
                data: response?.data?.data,
                token: response?.data?.token,
                email: response?.data?.data?.email,
                role: response?.data?.data?.role,
                accessToken: response?.data?.token?.AccessToken,
            };
            localStorage.setItem("user", JSON.stringify(obj));
            return response;
        } catch (error: any) {
            Toast('Incorecct username or password', 'error')
            return rejectWithValue(error?.response?.data);
        } finally {
            dispatch(setLoading(false));
        }
    }
);




interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
    status: string
}

interface User {
    Tokens: [],
    data: []
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
    status: REQUEST_STATUS.IDLE
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state, action) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.SUCCEEDED;
                state.user = action?.payload;
            })
            .addCase(signin.rejected, (state, action: any) => {
                state.status = REQUEST_STATUS.FAILED;
                state.error = action.payload?.error;
            })
    }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
