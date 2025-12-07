import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../redux/products/productSlice'
import cartReducer from '../redux/cart/cartSlice'
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  }
})