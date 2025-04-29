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
    toggleFavourite(state, action: PayloadAction<number>) {
      const index = state.items.indexOf(action.payload);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
  }
});
// Actions export
export const { toggleFavourite } = favouriteSlice.actions;
// Reducer export
export default favouriteSlice.reducer;