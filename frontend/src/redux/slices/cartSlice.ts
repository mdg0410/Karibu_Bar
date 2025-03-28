import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  tableId?: string;
  tableNumber?: number;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setTable: (state, action: PayloadAction<{ tableId: string; tableNumber: number }>) => {
      state.tableId = action.payload.tableId;
      state.tableNumber = action.payload.tableNumber;
    },
    clearTable: (state) => {
      state.tableId = undefined;
      state.tableNumber = undefined;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setTable, clearTable } = cartSlice.actions;

export default cartSlice.reducer;
