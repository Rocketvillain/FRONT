import { NavLink } from "react-router-dom";
import '../css/HosAdminMain.css';

function HosAdminMain() {
    return (
        <>
            <div className="hos-admin-main-container">
                <div className="hos-admin-main-brand-container">
                    <div className="hos-admin-main-brand-background">
                        <img src="/images/main3.png" className="hos-admin-main-logo" />
                        <span className="hos-admin-main-title">Hospital Admin</span>
                        <img src="/images/main4.png" className="hos-admin-main-logo" />
                    </div>
                </div>
                <ul className="hos-admin-main-nav-list">
                    <li className="hos-admin-main-nav-item">
                        <NavLink to="/hospitalview">
                            <img src="/images/main4.png" alt="예약관리" />
                            <span>예약 관리</span>
                        </NavLink>
                    </li>
                    <li className="hos-admin-main-nav-item">
                        <NavLink to="/reserstatus">
                            <img src="/images/main1.png" alt="후기조회" />
                            <span>후기 조회</span>
                        </NavLink>
                    </li>
                    <li className="hos-admin-main-nav-item">
                        <NavLink to="/expenses">
                            <img src="/images/main1.png" alt="일정관리" />
                            <span>일정 관리</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default HosAdminMain;
