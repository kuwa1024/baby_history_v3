import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Item } from "./historySlice"

interface ItemsState {
  items: Item[]
}

const initialState: ItemsState = {
  items: [],
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload
    },
    addItems(state, action: PayloadAction<Item[]>) {
      const newItems = action.payload.filter(
        (newItem) => !state.items.some((item) => item.id === newItem.id),
      )
      state.items = [...state.items, ...newItems]
    },
    resetItems(state) {
      state.items = []
    },
  },
})

export const { setItems, addItems, resetItems } = itemsSlice.actions
export default itemsSlice.reducer
