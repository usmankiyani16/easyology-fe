import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { postApi } from "../../utils/api/api";
import { REQUEST_STATUS } from "../../utils/constants";
import { setLoading } from "../loader/loader-slice";
import { Toast } from "../../components/common/toast/toast";
import { UserRole } from "../../utils/interfaces";

type SigninPayload = {
  email: string;
  password: string;
  deviceId?: string;
  otp?: string;
};
export const signin = createAsyncThunk(
  "auth/signin",
  async (payload: SigninPayload, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await postApi("/user/sign-in", payload);
      console.log("response?.data?.message", response);

      if (
        response?.message ==
        "New device detected! Please verify the OTP sent to your mail."
      ) {
        dispatch(setIsOTP(true));
        return response;
      } else {
        if (
          response?.data?.User?.role &&
          Object.values(UserRole).includes(response?.data?.User?.role)
        ) {
          let obj = {
            data: response?.data?.User,
            email: response?.data?.User?.email,
            role: response?.data?.User?.role,
            accessToken: response?.data?.Authentication?.AccessToken,
            refreshToken: response?.data?.Authentication?.RefreshToken,
            deviceId: response?.data?.User?.deviceId,
          };
          let deviceId = response?.data?.User?.deviceId;
          localStorage.setItem("user", JSON.stringify(obj));
          localStorage.setItem("deviceId", deviceId);
          return response;
        } else {
          Toast("You cannot log in on POS", "error");
          return rejectWithValue({ error: "You cannot log in on POS" });
        }
      }
    } catch (error: any) {
      Toast(error?.response?.data?.message, "error");
      return rejectWithValue(error?.response?.data);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface AuthState {
  isOTP: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  status: string;
}

interface User {
  Tokens: [];
  data: [];
}

const initialState: AuthState = {
  isOTP: false,
  isAuthenticated: false,
  user: null,
  error: null,
  status: REQUEST_STATUS.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsOTP(state, action: PayloadAction<boolean>) {
      state.isOTP = action?.payload;
    },
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
        console.log(action?.payload);

        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload?.error;
      });
  },
});

export const { setUser, setIsOTP } = authSlice.actions;

export default authSlice.reducer;
