import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import { Provider } from "react-redux";
import { store } from "../../Redux/store";

export default function MainLayout(){
    return(
        <Provider store={store}>
            <Header/>
            <main className="flex-1 pt-15">
                <Outlet/>
            </main>
            <Footer/>
        </Provider>
    )
}