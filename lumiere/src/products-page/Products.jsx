import { Outlet } from "react-router-dom";
import Navbar from "../user-landing-page/navbar.jsx";
import Contents from "./contents.jsx";
import Rings from "./rings.jsx";
import Necklaces from "./necklaces.jsx";
import Bracelets from "./bracelets.jsx";
import Footer from "../user-landing-page/footer.jsx"
import { ProductProvider } from "./ProductContext.jsx";
import FeaturedJewelrySection from "./FeaturedJewelrySection.jsx";



function Products(){
    return(
        <>
        <ProductProvider>
            <Navbar />  
            <Contents/> 
            <FeaturedJewelrySection/>
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