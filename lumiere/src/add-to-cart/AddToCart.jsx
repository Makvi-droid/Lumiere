import React from "react";
import Navbar from "../user-landing-page/navbar";
import Orders from './Orders'
import { OrderProvider } from "./OrderContext";


function AddToCart(){


    return(
        <>
        <OrderProvider>
            <Navbar/>
            <Orders/>
        </OrderProvider>
        </>
    );
}

export default AddToCart;