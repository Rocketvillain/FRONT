import { Outlet } from "react-router-dom";
import AdminHeader from '../components/commons/header/AdminHeader';

function AdminLayout() {

    return(
        <>
        <AdminHeader/>
        <div>
        <Outlet/>
        </div>
        </>
    )
}

export default AdminLayout;