import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketItem {
    productId: number,
    quantity: number,
}

interface BasketState {
    items: BasketItem[];
}
// Basket initial state
const initialState: BasketState = {
    items: [],
};
// Create basket slice
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        // action.payload=product.id
        addToBasket(state, action: PayloadAction<number>) {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) { item.quantity++; }
            else {
                state.items.push({ productId: action.payload, quantity: 1 });
            }
        },
        removeFromBasket(state, action: PayloadAction<number>) {
            state.items = state.items.filter(i => i.productId !== action.payload);
        },
        decreaseQuantity(state, action: PayloadAction<number>) {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                }
                else {
                    // If quantity == 1 then remove product from basket
                    state.items = state.items.filter(i => i.productId !== action.payload);
                }
            }
        },
        clearBasket(state) {
            state.items = [];
        },

    }
},
);
// Actions export
export const { addToBasket, removeFromBasket, decreaseQuantity, clearBasket } = basketSlice.actions;
// Reducer export
export default basketSlice.reducer;