import Header from "../components/commons/Header";
import { Outlet } from "react-router-dom";
import '../css/Layout.css';
import Footer from "../components/commons/Footer";

function Layout() {

    return(
        <div className="layout-container">
            <Header/>
            <div>
            <Outlet/>
            </div>
        </div>
    )
}
export default Layout;
