import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    tax: 8,
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
        message.success("Ürün eklendi.");
      }
      state.total += action.payload.price;
    },
    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
      message.info("Ürün başarıyla silindi.");
    },
    increase: (state, action) => {
      const cartFindItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartFindItem.quantity += 1;
      state.total += cartFindItem.price;
    },
    decrease: (state, action) => {
      const cartFindItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartFindItem.quantity -= 1;
      state.total -= cartFindItem.price;

      if (cartFindItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    reset: (state, action) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addProduct, deleteProduct, increase, decrease, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
