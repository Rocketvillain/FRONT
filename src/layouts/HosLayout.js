import { Outlet } from "react-router-dom";
import HosHeader from "../components/commons/header/HosHeader";
function HosLayout() {

    return(
        <div className="layout-container">
        <HosHeader/>
        <div>
        <Outlet/>
        </div>
        </div>
    )
}

export default HosLayout;