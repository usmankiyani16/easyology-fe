import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';

const store = configureStore({
    reducer: rootReducer,
    // Add middleware and other store configurations here
});

export default store;
