import { Outlet } from "react-router-dom";
import Navbar from "../user-landing-page/navbar.jsx";
import Contents from "./contents.jsx";
import Rings from "./rings.jsx";
import Necklaces from "./necklaces.jsx";
import Bracelets from "./Bracelets.jsx";
import Footer from "../user-landing-page/footer.jsx"
import { ProductProvider } from "./ProductContext.jsx";


function Products(){
    return(
        <>
        <ProductProvider>
            <Navbar />  
            <Contents/> 
            <Rings/>
            <Necklaces/>
            <Bracelets/>
            <Footer/>
            <Outlet/>
            </ProductProvider>
        </>
    );
}

export default Products;