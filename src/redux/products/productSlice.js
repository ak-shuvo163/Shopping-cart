import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Casual T-shirt",
    price: 100,
    category: "Gadgets",
    image:
      "https://media.istockphoto.com/id/934203126/photo/blank-white-t-shirt-mock-up-on-wooden-hanger-front-and-rear-side-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=X02N1_sKjWwSLodhxBt4n0Ypf1S9asAIK-PFGme033I=",
    date: "2025-11-12",
  },
  {
    id: 2,
    name: "Jaelynn Castillo",
    price: 150,
    category: "Gadgets",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1999",
    date: "2025-11-12",
  },
  {
    id: 3,
    name: "Jakub Żerdzicki",
    price: 180,
    category: "Gadgets",
    image:
      "https://images.unsplash.com/photo-1732717381259-de32a150bd42?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    date: "2025-11-12",
  },
  {
    id: 4,
    name: "Elshan Neymatov",
    price: 220,
    category: "Gadgets",
    image:
      "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    date: "2025-11-12",
  },
];
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
        ...action.payload,
      };
      state.push(newProduct);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
