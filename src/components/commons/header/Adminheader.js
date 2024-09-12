import { NavLink } from "react-router-dom";
import '../../../css/AdminHeader.css';

function AdminHeader() {
    const activeStyle = {
        // backgroundColor: 'white',
        color: 'white'
    }

    return(
        <div className="admin-header-container">
            <ul className="adminnav-list">
                <li className="adminnav-item">
                    <NavLink to="/" exact>
                        <img className="mainImage" src="/images/logo.png" alt="메인 이미지" />
                    </NavLink>
                </li>
                <li className="adminnav-item">
                    <NavLink to="/hoscontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>병원관리</span>
                    </NavLink>
                </li>
                <li className="adminnav-item">
                    <NavLink to="/resercontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>예약관리</span>
                    </NavLink>
                </li>
                <li className="adminnav-item">
                    <NavLink to="/reviewcontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>후기관리</span>
                    </NavLink>
                </li>
                <li className="adminnav-item">
                    <NavLink to="/reportscontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>문의/신고 관리</span>
                    </NavLink>
                </li>
                <li className="adminnav-item">
                    <NavLink to="/logout" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>

    )
}

export default AdminHeader;