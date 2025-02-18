import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemState {
  search?: string;
}

const initialState: ItemState = {};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = itemSlice.actions;
export default itemSlice.reducer;
