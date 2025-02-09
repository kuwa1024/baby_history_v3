import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from './historySlice';

interface lastItemsState {
  lastItems: Item[];
}

const initialState: lastItemsState = {
  lastItems: [],
};

const lastItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setLastItems(state, action: PayloadAction<Item[]>) {
      state.lastItems = action.payload;
    },
    resetLastItems(state) {
      state.lastItems = [];
    },
  },
});

export const { setLastItems, resetLastItems } = lastItemsSlice.actions;
export default lastItemsSlice.reducer;
