import { NavLink } from "react-router-dom";
import '../css/AdminMain.css';

function AdminMain() {
    return (
        <>
            <div className="admin-main-container">
                <div className="admin-main-brand-container">
                    <div className="admin-main-brand-background">
                        <img src="/images/main3.png" className="admin-main-logo" />
                        <span className="admin-main-title">Admin</span>
                        <img src="/images/main4.png" className="admin-main-logo" />
                    </div>
                </div>
                <ul className="admin-main-nav-list">
                    <li className="admin-main-nav-item">
                        <NavLink to="/hoscontrol">
                            <img src="/images/main3.png" alt="병원관리" />
                            <span>병원<br />관리</span>
                        </NavLink>
                    </li>
                    <li className="admin-main-nav-item">
                        <NavLink to="/resercontrol">
                            <img src="/images/main4.png" alt="예약관리" />
                            <span>예약<br />관리</span>
                        </NavLink>
                    </li>
                    <li className="admin-main-nav-item">
                        <NavLink to="/usercontrol">
                            <img src="/images/main4.png" alt="회원관리" />
                            <span>회원<br />관리</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default AdminMain;
