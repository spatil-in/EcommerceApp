import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favItems: localStorage.getItem('Fav') ? JSON.parse(localStorage.getItem('Fav')) : []
}

export const favProductSlice = createSlice({
    name: 'favProducts',
    initialState,
    reducers:{
        addToFav:(state, action) => {
            const {favObj} = action.payload;
            state.favItems = [favObj , ...state.favItems]
            localStorage.setItem("Fav" , JSON.stringify(state.favItems))
        },
        deleteFav:(state, action) => {
            let {uniqeID} = action.payload
            state.favItems = state.favItems.filter((obj) => obj.uniqeID !== uniqeID)
            localStorage.setItem("Fav" , JSON.stringify(state.favItems))
        }
    }
})

export const { addToFav , deleteFav } = favProductSlice.actions
export default favProductSlice.reducer