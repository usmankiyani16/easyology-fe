import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth-r/auth-slice';
import loaderReducer from './loader-r/loader-slice'

const rootReducer = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    // Add your other feature slices here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
