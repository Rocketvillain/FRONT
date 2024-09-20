// 로그인 후 사용자 헤더
import { NavLink } from "react-router-dom";
import '../../../css/component/UserHeader.css';

function UserHeader() {

    return(
        <div className="userheader-container">
            <div className="logo-container">
                <NavLink to="/" exact className="logo-link">
                    <img className="mainImage" src="/images/logo.png" alt="메인 이미지" />
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
            <NavLink to="/logout" className="logout-container">
                <img src="/images/signup_logout_1.png" alt="로그아웃 아이콘" />
                <span>LOGOUT</span>
            </NavLink>
        </div>
    );
}

export default UserHeader;