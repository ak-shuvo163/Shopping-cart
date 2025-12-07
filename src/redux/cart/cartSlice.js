import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    return [];
  }
};

const initialState = getCartFromLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return action.payload;
    },

    addToCart: (state, action) => {
      const existingProduct = state.find(p => p.productId === action.payload.id);
      if (existingProduct) {
        toast.error("This product is already in your cart");
      } else {
        state.push({
          ...action.payload,
          id: Date.now(),
          quantity: 1,
          productId: action.payload.id
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action) => {
      const product = state.find(p => p.id === action.payload);
      if (product) product.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action) => {
      const product = state.find(p => p.id === action.payload);
      if (product && product.quantity > 1) product.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeQuantity: (state, action) => {
      const newState = state.filter(p => p.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    }
  }
});

export const { setCart, addToCart, increaseQuantity, decreaseQuantity, removeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
