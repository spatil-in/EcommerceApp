import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import cartSlice from "./cartSlice";
import favProductSlice from "./favProducts";

export const store = configureStore({
    reducer:{
        counterStore: counterSlice,
        cartStore : cartSlice,
        favStore : favProductSlice
    }
})