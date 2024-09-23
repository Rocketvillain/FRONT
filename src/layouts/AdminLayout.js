import { Outlet } from "react-router-dom";
import AdminHeader from '../components/commons/header/AdminHeader';

function AdminLayout() {

    return(
        <div className="layout-container">
        <AdminHeader/>
        <div>
        <Outlet/>
        </div>
        </div>
    )
}

export default AdminLayout;