import { NavLink } from "react-router-dom"
import '../../css/component/Header.css'


function Header() {

    const activeStyle = {
        backgroundColor: 'white',
        color: 'black'
    }

    return (
        <div className="header-container">
        <ul className="header-nav-list">
            <li className="header-nav-item">
                <NavLink to="/" exact>
                    <img className="mainImage" src="/images/main.png" alt="메인 이미지" />
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/hossearch" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>병원검색</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/hosreser" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>병원예약</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/expenses" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>평균 진료비 보기</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/allreview" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>후기보기</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/myinfo" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>마이페이지</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>Login</span>
                </NavLink>
            </li>
            <li className="header-nav-item">
                <NavLink to="/signup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>Signup</span>
                </NavLink>
            </li>
        </ul>
    </div>
    )
}

export default Header;