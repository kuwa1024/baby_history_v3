import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface itemState {
  search?: string;
}

const initialState: itemState = {};

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
