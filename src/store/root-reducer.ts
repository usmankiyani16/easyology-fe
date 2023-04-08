import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import loaderReducer from './loader/loader-slice';
import catogaryReducer from './catogaries/catogaries-slice'
import mediaUploadReducer from './media/media-slice'
import vendorsReducer from './vendors/vendors-slice'
const rootReducer = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    catogaries: catogaryReducer,
    media: mediaUploadReducer,
    vendors: vendorsReducer

    // Add your other feature slices here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
