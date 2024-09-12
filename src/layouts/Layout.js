import Header from "../components/commons/Header";
import Userheader from "../components/commons/header/Userheader";
import Navbar from "../components/commons/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {

    return(
        <>
        <Header/>
        <Userheader/>
        {/* <Navbar/> */}
        <div>
        <Outlet/>
        </div>
        </>
    )
}

export default Layout;