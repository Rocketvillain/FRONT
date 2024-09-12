import { Outlet } from "react-router-dom";

function Adminlayout() {

    return(
        <>
        <Adminheader/>
        <div>
        <Outlet/>
        </div>
        </>
    )
}

export default Adminlayout;