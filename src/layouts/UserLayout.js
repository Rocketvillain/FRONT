import UserHeader from "../components/commons/header/UserHeader";
import { Outlet } from "react-router-dom";
import '../css/Layout.css';

function UserLayout() {

    return (
        <div className="layout-container">
            <UserHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout;