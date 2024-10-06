import { NavLink } from "react-router-dom";
import '../../../css/component/AdminHeader.css';
import { useDispatch } from "react-redux";
import { logOut as userLogOut } from "../../../modules/UserModule";
import { reset as resetHospital } from "../../../modules/HospitalModule";
import { reset as resetHospitalSchedule } from "../../../modules/HospitalScheduleModule";
import { reset as resetReservation } from "../../../modules/ReservationModule";

function AdminHeader() {

    const dispatch = useDispatch(); 
    
    const activeStyle = {
        // backgroundColor: 'white',
        color: 'black',
    }

    const linkStyle = {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: 'inherit',
    };

    const handleLogout = () => {

        // 로그인 상태를 리셋하는 액션을 디스패치
        dispatch(userLogOut());
        dispatch(resetHospital());
        dispatch(resetHospitalSchedule());
        dispatch(resetReservation());

        // 로그아웃 후 메인 페이지로 리다이렉트
        window.location.href = '/';
    };

    return(
        <div className="admin-header-container">
            <div className="logo-admincontainer">
                <NavLink to="/" className="logo-adminlink">
                    <img className="mainImage" src="/images/logo2.png" alt="메인 이미지" />
                    <span>Healing Pets</span>
                </NavLink>
            </div>
            <ul className="adminnav-list">
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
                    <NavLink to="/usercontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>회원관리</span>
                    </NavLink>
                </li>
                {/* <li className="adminnav-item">
                    <NavLink to="/reportscontrol" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>문의/신고 관리</span>
                    </NavLink>
                </li> */}
            </ul>
            {/* 로그아웃 버튼에 onClick 이벤트 추가 */}
            <div className="logout-admincontainer" onClick={handleLogout}>
                <img src="/images/signup_logout_1.png" alt="로그아웃 아이콘" />
                <span>LOGOUT</span>
            </div>
        </div>

    )
}

export default AdminHeader;