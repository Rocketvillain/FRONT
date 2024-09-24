import UserHeader from "../components/commons/header/UserHeader";
import { Outlet } from "react-router-dom";

function UserLayout2() {

    return (
        <div>
            <UserHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout2;