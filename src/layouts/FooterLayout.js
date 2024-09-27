import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import '../css/component/Footer.css';
import { Outlet } from "react-router-dom";

function FooterLayout() {

    return(
        <div className="layout-container">
        <Header/>
        <div>
        <Outlet/>
        </div>
        <Footer/>
        </div>
    )
}

export default FooterLayout;