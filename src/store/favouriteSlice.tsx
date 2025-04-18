import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteState {
  items: number[];
}
// Favourite initial state
const initialState: FavouriteState = {
  items: [],
};
// Create favourite slice
const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavourite(state, action: PayloadAction<number>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourite(state, action: PayloadAction<number>) {
      state.items = state.items.filter(id => id !== action.payload);
    },
    clearFavourite(state) {
      state.items = [];
    },
  },
});
// Actions export
export const { addToFavourite, removeFromFavourite, clearFavourite } = favouriteSlice.actions;
// Reducer export
export default favouriteSlice.reducer;