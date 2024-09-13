import Header from "../components/commons/Header";
import { Outlet } from "react-router-dom";

function Layout() {

    return(
        <>
        <Header/>
        <div>
        <Outlet/>
        </div>
        </>
    )
}
export default Layout;
