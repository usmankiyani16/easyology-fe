import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import loaderReducer from './loader/loader-slice'

const rootReducer = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    // Add your other feature slices here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
