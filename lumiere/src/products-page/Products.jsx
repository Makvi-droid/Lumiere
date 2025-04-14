import { Outlet } from "react-router-dom";
import Navbar from "../user-landing-page/navbar.jsx";
import Contents from "./contents.jsx";

function Products(){
    return(
        <>
            <Navbar />  
            <Contents/> 
            <Outlet/>
        </>
    );
}

export default Products;