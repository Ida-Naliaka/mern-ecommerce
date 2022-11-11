import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      let sum = 0;
          state.products.forEach(element => {sum += element.price})
          state.total=sum
    },
    
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products.filter((product)=> product._id===action.payload._id);
      let sum = 0;
          state.products.forEach(element => {sum +=element.price})
          state.total=sum
    },
  },
});

export const { addProduct, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;