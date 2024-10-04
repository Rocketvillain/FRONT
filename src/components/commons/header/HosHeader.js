import { NavLink } from "react-router-dom";
import '../../../css/component/HosHeader.css';
import { useDispatch } from 'react-redux';
import { logOut as userLogOut } from "../../../modules/UserModule";
import { reset as resetHospital } from "../../../modules/HospitalModule";
import { reset as resetHospitalSchedule } from "../../../modules/HospitalScheduleModule";
import { reset as resetReservation } from "../../../modules/ReservationModule";

function HosHeader() {
    const dispatch = useDispatch();

    const activeStyle = {
        color: 'black',
    };

    const linkStyle = {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: 'inherit',
    };

    // 로그아웃 핸들러
    const handleLogout = () => {
        // 로그인 상태를 리셋하는 액션을 디스패치
        dispatch(userLogOut());
        dispatch(resetHospital());
        dispatch(resetHospitalSchedule());
        dispatch(resetReservation());

        // 로그아웃 후 메인 페이지로 리다이렉트
        window.location.href = '/';
    };

    return (
        <div className="hos-header-container">
            <div className="hos-header-logo-container">
                <NavLink to="/" exact className="hos-header-logo-link">
                    <img className="hos-header-mainImage" src="/images/logo.png" alt="메인 이미지" />
                    <span>Healing Pets</span>
                </NavLink>
            </div>
            <ul className="hos-header-nav-list">
                <li className="hos-header-nav-item">
                    <NavLink to="/hosresercontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>예약관리</span>
                    </NavLink>
                </li>
                <li className="hos-header-nav-item">
                    <NavLink to="/hosreviewcontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>후기관리</span>
                    </NavLink>
                </li>
                <li className="hos-header-nav-item">
                    <NavLink to="/hosschedule" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>일정관리</span>
                    </NavLink>
                </li>
                <li className="hos-header-nav-item">
                    <NavLink to="/hosinfo" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>마이페이지</span>
                    </NavLink>
                </li>
            </ul>
            <div className="hos-header-logout-container" onClick={handleLogout} style={linkStyle}>
                <img src="/images/signup_logout_1.png" alt="로그아웃 아이콘" />
                <span>LOGOUT</span>
            </div>
        </div>
    );
}

export default HosHeader;
