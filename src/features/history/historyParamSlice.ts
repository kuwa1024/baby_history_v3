import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '@/features/history/historySlice';

interface historyParamState {
  lastItems: Item[];
  search?: string;
}

const initialState: historyParamState = {
  lastItems: [],
};

const historyParamSlice = createSlice({
  name: 'historyParam',
  initialState,
  reducers: {
    setLastItems(state, action: PayloadAction<Item[]>) {
      state.lastItems = action.payload;
    },
    resetLastItems(state) {
      state.lastItems = [];
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.lastItems = [];
    },
  },
});

export const { setLastItems, resetLastItems, setSearch } = historyParamSlice.actions;
export default historyParamSlice.reducer;
