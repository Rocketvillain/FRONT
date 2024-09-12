import Hosheader from "../components/commons/header/Hosheader";
import { Outlet } from "react-router-dom";

function Hoslayout() {

    return(
        <>
        <Hosheader/>
        <div>
        <Outlet/>
        </div>
        </>
    )
}

export default Hoslayout;