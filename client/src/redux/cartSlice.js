import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    price: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const cartFindItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (cartFindItem) {
        cartFindItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      message.success("Ürün başarıyla silindi.");
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
