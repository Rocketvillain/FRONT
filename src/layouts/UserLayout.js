import UserHeader from "../components/commons/header/UserHeader";
import { Outlet } from "react-router-dom";

function UserLayout() {

    return(
        <>
        <UserHeader/>
        <div>
        <Outlet/>
        </div>
        </>
    )
}

export default UserLayout;