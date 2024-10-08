import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut as userLogOut } from "../../../modules/UserModule";
import { reset as resetHospital } from "../../../modules/HospitalModule";
import { reset as resetHospitalSchedule } from "../../../modules/HospitalScheduleModule";
import { reset as resetReservation } from "../../../modules/ReservationModule";
import { reset as resetReview } from "../../../modules/ReviewModule";
import '../../../css/component/UserHeader.css';

function UserHeader() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleLogout = () => {

        // 로그인 상태를 리셋하는 액션을 디스패치
        dispatch(userLogOut());
        dispatch(resetHospital());
        dispatch(resetHospitalSchedule());
        dispatch(resetReservation());
        dispatch(resetReview());


        // 로그아웃 후 메인 페이지로 리다이렉트
        navigate('/');
    };

    return (
        <div className="userheader-container">
            <div className="userlogo-container">
                <NavLink to="/" className="userlogo-link">
                    <img className="usermainImage" src="/images/logo.png" alt="메인 이미지" />
                    <span>Healing Pets</span>
                </NavLink>
            </div>
            <ul className="usernav-list">
                <li className="usernav-item">
                    <NavLink to="/hospitalview" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <span>병원검색</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/hosreser" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <span>병원예약</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <span>평균 진료비 보기</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/allreviews" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <span>후기보기</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/myinfo" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <span>마이페이지</span>
                    </NavLink>
                </li>
            </ul>
            {/* 로그아웃 버튼에 onClick 이벤트 추가 */}
            <div className="logout-container" onClick={handleLogout}>
                <img src="/images/signup_logout_1.png" alt="로그아웃 아이콘" />
                <span>LOGOUT</span>
            </div>
        </div>
    );
}

export default UserHeader;
