import { Outlet } from "react-router-dom";
import HosHeader from "../components/commons/header/HosHeader";

function HosLayout() {

    return(
        <>
        <HosHeader/>
        <div>
        <Outlet/>
        </div>
        </>
    )
}

export default HosLayout;