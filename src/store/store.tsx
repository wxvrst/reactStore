import { configureStore } from '@reduxjs/toolkit';
// Reducers import
import productsReducer from './productsSlice';
import usersReducer from './usersSlice'
import basketReducer from './basketSlice'
import favouriteReducer from './favouriteSlice'
// Create Redux store
export const store = configureStore({
    reducer: {
        // Connecting the reducers
        products: productsReducer,
        users: usersReducer,
        basket: basketReducer,
        favourite: favouriteReducer,
    },
});
// Types for typing useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;// Type of the entire state
export type AppDispatch = typeof store.dispatch;// Type of the dispatch