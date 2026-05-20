import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('Cart') ? JSON.parse(localStorage.getItem('Cart')) : []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state, action) => {
            const {cartObj} = action.payload;
            state.cartItems = [cartObj , ...state.cartItems]
            localStorage.setItem("Cart" , JSON.stringify(state.cartItems))
        },
        deleteCart:(state, action) => {
            let {uniqeID} = action.payload
            state.cartItems = state.cartItems.filter((obj) => obj.uniqeID !== uniqeID)
            localStorage.setItem("Cart" , JSON.stringify(state.cartItems))
        },
        changeqty:(state, action) => {
            let {uniqeID , finalQty} = action.payload
            state.cartItems = state.cartItems.map((obj) =>{
                if(obj.uniqeID == uniqeID){
                    obj.qty = finalQty
                }
                return obj;
            })
            localStorage.setItem("Cart" , JSON.stringify(state.cartItems))
        }
    }
})

export const { addToCart , deleteCart , changeqty } = cartSlice.actions
export default cartSlice.reducer