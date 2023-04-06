import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
}

interface User {
    Tokens: [],
    data: []
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
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
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { setUser, clearUser, setError } = authSlice.actions;

export default authSlice.reducer;
