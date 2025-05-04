import { Outlet } from "react-router-dom";
import Navbar from "../user-landing-page/navbar.jsx";
import Contents from "./contents.jsx";
import Rings from "./rings.jsx";
import Necklaces from "./necklaces.jsx";
import Bracelets from "./Bracelets.jsx";
import Footer from "../user-landing-page/footer.jsx"

function Products(){
    return(
        <>
            <Navbar />  
            <Contents/> 
            <Rings/>
            <Necklaces/>
            <Bracelets/>
            <Footer/>
            <Outlet/>
        </>
    );
}

export default Products;