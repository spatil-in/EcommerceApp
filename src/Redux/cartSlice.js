import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state, action) => {
            const {cartObj} = action.payload;
            state.cartItems = [cartObj , ...state.cartItems]
        },
        deleteCart:(state, action) => {},
        changeqty:(state, action) => {}
    }
})

export const { addToCart , deleteCart , changeqty } = cartSlice.actions
export default cartSlice.reducer