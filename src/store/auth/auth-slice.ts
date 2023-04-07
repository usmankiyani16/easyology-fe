import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postApi } from '../../utils/api/api';
import { REQUEST_STATUS } from '../../utils/constants';
import { setLoading } from '../loader/loader-slice';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/common/toast/toast';
import { UserRole } from '../../utils/interfaces';

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
            console.log('res', response)
            if (response?.message) {
                Toast(response.message)
            } else {
                const navigate = useNavigate();
                let obj = {
                    data: response?.data,
                    token: response?.token,
                    email: response?.data?.email,
                    role: response?.data?.role,
                    accessToken: response?.token?.AccessToken,
                };
                localStorage.setItem("user", JSON.stringify(obj));
                if (obj?.role === UserRole.ADMIN) {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/dashboard");
                }
            }
            return response.data;
        } catch (error) {
            console.log('error', error);
            return rejectWithValue(error);
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
    extraReducers: (builder) => { }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
