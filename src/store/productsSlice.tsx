import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, apiUrl } from '../types/Product';

interface ProductsState {
    data: Product[];
    loading: boolean;
    error: string | null;
    categories: string[];
    selectedCategory: string;
    searchQuery: string;
}
// Products initial state
const initialState: ProductsState = {
    data: [],
    loading: false,
    error: null,
    categories: [],
    selectedCategory: '',
    searchQuery: '',
};
// Async product fetch
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const response = await axios.get<Product[]>(apiUrl);
    return response.data;
});
// Create products slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    // Sync
    reducers: {
        // Actions for category selection and search
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload.toLowerCase();
        },
    },
    // Async
    extraReducers: (builder) => {
        builder
            // Loading has started
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Upload successful
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // Get unique categories
                state.categories = Array.from(new Set(action.payload.map(p => p.category)));
            })
            // Loading error
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error';
            });
    },
});
// Actions and reducer export
export const { setSelectedCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
