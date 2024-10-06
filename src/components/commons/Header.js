import { NavLink } from "react-router-dom"
import '../../css/component/Header.css'


function Header() {

    const activeStyle = {
        // backgroundColor: 'white',
        color: 'black'
    }

    return (
        <div className="header-container">
            <div className="logo-h-container">
                <NavLink to="/" className="logo-h-link">
                    <img className="mainImage" src="/images/logo.png" alt="메인 이미지" />
                    <span>Healing Pets</span>
                </NavLink>
            </div>
        <ul className="header-nav-list">
            <li className="header-nav-item">
                <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>병원검색</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>병원예약</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/expenses" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>평균 진료비 보기</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>후기보기</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>마이페이지</span>
                </NavLink>
            </li>
        </ul>
        <div className="log-container">
        <NavLink to="/login" className="login-container" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                <img src="/images/Login_2.png" alt="로그인" />
                <span>LOGIN</span>
        </NavLink>
        <NavLink to="/signup" className="sign-container"style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                <img src="/images/signup_logout_1.png" alt="회원가입" />
                <span>SIGNUP</span>
        </NavLink>
        </div>
    </div>
    )
}

export default Header;